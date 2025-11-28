import requests

url = "https://yousef-bakr-s-portfolio.vercel.app/sitemap.xml"
try:
    response = requests.get(url)
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    for key, value in response.headers.items():
        print(f"{key}: {value}")
    print(f"\nContent Preview:\n{response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")
