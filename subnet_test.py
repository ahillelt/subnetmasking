import random
import ipaddress
import random


class CustomRandom:
    def __init__(self, seed):
        self.seed = seed

    def next(self):
        self.seed = (self.seed * 16807) % 2147483647
        return self.seed

def generate_problem(seed):
    rand = CustomRandom(seed)
    ip_address = [str(rand.next() % 256) for _ in range(4)]
    cidr = rand.next() % 6 + 24

    return ['.'.join(ip_address), cidr]


    
def generate_network_info(ip_address, cidr):
    # Create a network interface
    net_interface = ipaddress.IPv4Interface(f'{ip_address}/{cidr}')

    # Get the network
    network = net_interface.network

    # Calculate the network address and broadcast address
    network_address = network.network_address
    broadcast_address = network.broadcast_address

    # Calculate the first and last addresses only if CIDR is not 32
    if cidr < 32:
        first_address = network.network_address + 1
        last_address = network.broadcast_address - 1
    else:
        first_address = None
        last_address = None

    return network_address, broadcast_address, first_address, last_address
    
    
    
# Generate a unique code
unique_code = int(input("provide unique_code: "))

for j in range(5):
    problem = generate_problem(unique_code + j)
    print(f"Problem {j+1}: IP Address: {problem[0]}, CIDR: {problem[1]}")

print(f"Unique Code: {unique_code}")


# Use the function with the generated problems
for i in range(5): # Generate 5 problems
    ip_address, cidr = generate_problem(unique_code + i)
    network_address, broadcast_address, first_address, last_address = generate_network_info(ip_address, cidr)
    
    print(f"Problem {i+1}:")
    print(f"IP Address: {ip_address}, Subnet Mask: {cidr}")
    print(f"Network Address: {network_address}, Broadcast Address: {broadcast_address}")
    print(f"First Address in Subnet: {first_address}, Last Address in Subnet: {last_address}\n")
