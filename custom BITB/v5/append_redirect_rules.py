import csv

# Load the existing redirect rules
with open("/mnt/data/redirect.rules", "r") as file:
    existing_rules = file.readlines()

# Load the new IPs from the CSV
new_ips = []
with open("/mnt/data/msft-public-ips.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        new_ips.append(row[0])

# Extracting IPs already in the redirect rules to avoid duplication
existing_ips = [line.split()[2] for line in existing_rules if "RewriteCond" in line]

# Adding new IPs to the rules while avoiding duplicates
added_ips_count = 0
for ip in new_ips:
    if ip not in existing_ips:
        # Constructing a new rule line for the IP
        new_rule = f"RewriteCond %{{REMOTE_ADDR}} {ip} [OR]\n"
        existing_rules.insert(-1, new_rule)  # Adding the new rule just before the last line (RewriteRule)
        added_ips_count += 1

# Save the updated rules to a new file
updated_rules_path = "/mnt/data/updated_redirect.rules"
with open(updated_rules_path, "w") as file:
    file.writelines(existing_rules)