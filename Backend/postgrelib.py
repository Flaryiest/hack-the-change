# FROM: https://pypi.org/project/postgrelib/
    # modified to run on psycopg version 3
import psycopg, json

class DataType:
    class Integer:
        def __init__(self, name:str):
            self.name = name
            self.datatype = "INT"
    class Float:
        def __init__(self, name:str):
            self.name = name
            self.datatype = "REAL"
    class String:
        def __init__(self, name:str):
            self.name = name
            self.datatype = "VARCHAR(255)"
    class Array:
        def __init__(self, name:str):
            self.name = name
            self.datatype = "INT[]"
    class Dict:
        def __init__(self, name:str):
            self.name = name
            self.datatype = "JSONB"

class Database:
    def __init__(self, DB_NAME:str, DB_USER:str, DB_PASSWORD:str, DB_HOST:str, DB_PORT:int):
        self.DB_NAME = DB_NAME
        self.DB_USER = DB_USER
        self.DB_PASSWORD = DB_PASSWORD
        self.DB_HOST = DB_HOST
        self.DB_PORT = DB_PORT
        self.tables = {}
        self.conn = psycopg.connect(dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASSWORD, host=self.DB_HOST, port=self.DB_PORT)

class By:
    STRING = "STRING"
    INDEX = "INDEX"

class Table:
    def __init__(self, database, name: str, columns: list):
        self.name: str = name
        self.database = database
        self.conn = self.database.conn
        self.columns = {column.name: column for column in columns}
        self.database.tables[self.name] = self

    def execute(self, query, params=None, fetch=False):
        with self.conn.cursor() as cur:
            cur.execute(query, params)
            self.conn.commit()
            if fetch:
                return cur.fetchone()

    def create_table(self):
        column_definitions = [f"{col_name} {col.datatype}" for col_name, col in self.columns.items()]
        query = f"CREATE TABLE IF NOT EXISTS {self.name} ({', '.join(column_definitions)})"
        self.execute(query)

    def delete_table(self):
        self.execute(f"DROP TABLE IF EXISTS {self.name};")

    def insert_data(self, data, key):
        values = [json.dumps(value) if isinstance(value, dict) else value for value in data.values()]
        columns = ", ".join(data.keys())
        placeholders = ", ".join(["%s"] * len(values))

        update_columns = ", ".join([f"{col} = EXCLUDED.{col}" for col in data.keys() if col != key])

        with self.conn.cursor() as cur:
            cur.execute(f"""
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 
                    FROM pg_constraint 
                    WHERE conname = 'unique_{key}' 
                ) THEN
                    ALTER TABLE {self.name} ADD CONSTRAINT unique_{key} UNIQUE ({key});
                END IF;
            END $$;
            """)
            self.conn.commit()

        query = f"""
        INSERT INTO {self.name} ({columns}) 
        VALUES ({placeholders}) 
        ON CONFLICT ({key}) DO UPDATE 
        SET {update_columns};
        """

        self.execute(query, values)
        return True

    def check(self, column: str, item: str):
        column = self.columns[column]
        query = f"SELECT EXISTS (SELECT 1 FROM {self.name} WHERE {column.name} = %s);"
        return self.execute(query, (item,), fetch=True)[0]

    def search(self, by: By, column: str, key):
        column = self.columns[column]
        if by == By.STRING:
            query = f"""
            SELECT row_num AS index
            FROM (
                SELECT {column.name}, ROW_NUMBER() OVER (ORDER BY {column.name}) AS row_num
                FROM {self.name}
            ) AS numbered
            WHERE {column.name} = %s;
            """
            return self.execute(query, (key,), fetch=True)[0]
        
        elif by == By.INDEX:
            query = f"""
            WITH numbered_rows AS (
                SELECT {column.name}, ROW_NUMBER() OVER (ORDER BY {column.name}) AS rn
                FROM {self.name}
            )
            SELECT {column.name}
            FROM numbered_rows
            WHERE rn = {key};
            """
            return self.execute(query, fetch=True)[0]

    def update(self, key:int, data:dict):
        update_columns = [f"{col} = %s" for col in data if col in self.columns]
        update_values = [json.dumps(data[col]) if isinstance(data[col], dict) else data[col] for col in data if col in self.columns]

        if not update_columns:
            raise ValueError("No valid columns to update")

        query = f"""
        UPDATE {self.name}
        SET {', '.join(update_columns)}
        WHERE {key} = %s;
        """

        self.execute(query, update_values + [key])

    def get_row(self, index:int):
        columns = ", ".join(self.columns.keys())
        query = f"""
        WITH numbered_rows AS (
            SELECT {columns}, ROW_NUMBER() OVER () AS rn
            FROM {self.name}
        )
        SELECT {columns} FROM numbered_rows WHERE rn = %s;
        """
        
        row = self.execute(query, (index,), fetch=True)
        if row:
            return {column: value for column, value in zip(self.columns.keys(), row)}
        return None

class SimpleTable:
    def __init__(self, name:str, database:Database, key:str="username", item:str="data"):
        self.name = name
        self.key, self.item = key, item

        self.database = database
        self.conn = self.database.conn

    def create_table(self):
        with self.conn.cursor() as cur:
            cur.execute(f'''
                CREATE TABLE IF NOT EXISTS {self.name} (
                    {self.key} VARCHAR PRIMARY KEY,
                    {self.item} JSONB
                )
            ''')
        self.conn.commit()

    def insert_data(self, key:str, data:dict):
        with self.conn.cursor() as cur:
            cur.execute(f'''
                INSERT INTO {self.name} ({self.key}, {self.item}) VALUES (%s, %s)
                ON CONFLICT ({self.key}) DO UPDATE SET {self.item} = %s
            ''', (key, json.dumps(data), json.dumps(data)))
        self.conn.commit()

    def get_data(self, key:str):
        with self.conn.cursor() as cur:
            cur.execute(
                f'SELECT {self.item} FROM {self.name} WHERE {self.key} = %s', (key,))
            result = cur.fetchone()
            if result:
                return result[0]
            else:
                return None
