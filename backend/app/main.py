#!/usr/bin/env python
# encoding: utf-8
from flask import Flask, request, jsonify
import json
import mysql.connector
import datetime

app = Flask(__name__)

#RUN MYSQL IMAGE COMMAND
# docker pull mysql:latest
# docker run --name db -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=dep_db -e MYSQL_USER=user -e MYSQL_PASSWORD=password -d mysql:latest

# environment to connect to the database
host = '172.17.0.2'
port = 3306
config = {
    'user': 'user',
    'password': 'password',
    'host': host,
    'port': port,
    'database': 'dep_db'
}

# Class save people information before sending it.
class Department():
    # constructor
    def __init__(self, amount, description, responsable, department):
        self.amount = amount
        self.description = description
        self.responsable = responsable
        self.department = department

    # to convert attributes to a dict (json)
    def to_json(self):
        return {
            "amount": self.amount,
            "description": self.description,
            "responsable": self.responsable,
            "department": self.department
        }

# This function creates the desired table into the database when its initilized
def createTable():
    try:

        # Estabilishing  a connection cursor
        connection = mysql.connector.connect(**config)

        # Query for Creating the table
        # query_string = """DROP TABLE dep_table"""
        query_string = """CREATE TABLE IF NOT EXISTS dep_table (
                        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        amount int,
                        description VARCHAR(255),
                        responsable VARCHAR(255),
                        department VARCHAR(255),
                        month VARCHAR(255))"""

        # Creating a connection cursor
        cursor = connection.cursor()

        # Executing SQL Statement
        cursor.execute(query_string)

        # Saving the Actions performed on the DB
        connection.commit()

        print("\n✅ Table created successfully")

    except mysql.connector.Error as error:
        print("❎ Failed to create table in MySQL: {}".format(error))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# This function delete all rows into the database table.
def delete_records():
    try:
        # Estabilishing  a connection cursor
        connection = mysql.connector.connect(**config)

        # Query for Creating the table
        query_string = "DELETE FROM dep_table"

        # Creating a connection cursor
        cursor = connection.cursor()

        # Executing SQL Statement
        cursor.execute(query_string)

        # Saving the Actions performed on the DB
        connection.commit()
        print("\n✅ "+str(cursor.rowcount),
              "record(s) deleted successfully from table\n\n")

    except mysql.connector.Error as error:
        print("❎ Failed to delete record from table: {}".format(error))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            
# Get method that return all the people information saved in the database
@app.route('/', methods=['GET'])
def get_records():
    try:
        # Estabilishing  a connection cursor
        connection = mysql.connector.connect(**config)

        # Query for Creating the table
        query_string = "SELECT * FROM dep_table WHERE month=%s"

        # Creating a connection cursor
        cursor = connection.cursor()

        # Get current month
        month = datetime.datetime.now()
        month = month.strftime("%B")
        
        # Executing SQL Statement
        cursor.execute(query_string, [month])

        # Fetches all rows from the last executed statement
        records = cursor.fetchall()

        # output list
        output = []

        # Iterate over the rows
        for row in records:
            dep = Department(row[1], row[2], row[3], row[4])
            output.append(dep.to_json())
        
        # we close both the cursor and connection
        cursor.close()
        connection.close()

        print("\n✅ "+str(len(output)),
              "record(s) sent successfully")

        return jsonify(output)

    except mysql.connector.Error as error:
        print("Failed to create table in MySQL: {}".format(error))
        return jsonify({'error': 'Connection error. Data not found'})
    
    

# This function insert single and multiple rows into the database table.
@app.route('/', methods=['POST'])
def create_record():
    try:
        # Estabilishing  a connection cursor
        connection = mysql.connector.connect(**config)

        # Query for Creating the table
        query_string = "INSERT INTO dep_table (amount, description, responsable, department, month) VALUES(%s,%s,%s,%s,%s)"

        # Parse string to JSON object        
        data = json.loads(request.data)
        print(data)

        # Get current month
        month = datetime.datetime.now()
        month = month.strftime("%B")
        
        records_to_insert = []
        # Add the information to the table
        print("\nAdding Data...")
        
        # Handle single insertion
        print(" ● monto: {}\n ● descripcion: {}\n ● responsable: {}\n ● departamento: {}\n ● mes: {}".format(data['amount'], data['description'], data['responsable'], data['department'], month))
        records_to_insert.append((data['amount'], data['description'], data['responsable'], data['department'], month))

        # Creating a connection cursor
        cursor = connection.cursor()

        # Executing SQL Statements
        cursor.executemany(query_string, records_to_insert)

        # Saving the Actions performed on the DB
        connection.commit()
        print("\n✅ "+str(cursor.rowcount),
              "record(s) inserted successfully into table")
        return jsonify(data)

    except mysql.connector.Error as error:
        print("❎ Failed to insert record: {}".format(error))
        return jsonify(data)

    finally:
        if connection.is_connected():

            # Close the cursor and connection
            cursor.close()
            connection.close()


if __name__ == '__main__':
    # Create table
    createTable()
    # delete_records()
    
    # Run api
    app.run(debug=True)



