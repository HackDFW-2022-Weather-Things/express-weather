from distutils.command.config import config
import boto3
import os
import requests
import tqdm
from botocore.config import Config
from dotenv import load_dotenv

load_dotenv()

my_config = Config(
    region_name = 'us-east-1'
)

dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id= os.getenv('ACCESS_KEY'),
    aws_secret_access_key= os.getenv('SECRET_KEY'),
    config = my_config
)

table = dynamodb.Table('express-app')

table.put_item(
        Item={
              'id': '7566',
              'longitude_x': '32.7878937',
              'latitude_y': '46.7996563',
              'severity': 'calm',
              'timestamp': '1664097931'
        }
        )