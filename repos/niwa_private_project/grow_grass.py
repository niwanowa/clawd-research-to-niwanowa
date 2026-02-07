import argparse
import random
import subprocess
import sys
from datetime import datetime
import requests
from bs4 import BeautifulSoup

def fetch_contributions(username):
    url = f"https://github.com/users/{username}/contributions"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching contributions: {e}")
        sys.exit(1)

def parse_empty_days(html):
    soup = BeautifulSoup(html, 'html.parser')
    empty_days = []
    
    # GitHub's contribution graph usage
    # Look for table cells with data-level="0"
    # The structure might vary, but usually it's td.ContributionCalendar-day or similar
    # We will look for any element with data-date and data-level="0"
    
    # Updated to handle recent GitHub markup changes if any, but data-level="0" is standard for empty
    days = soup.find_all(attrs={"data-level": "0", "data-date": True})
    
    for day in days:
        date_str = day['data-date']
        empty_days.append(date_str)
        
    return empty_days

def git_commit(date_str, dry_run=False):
    # Create a random time within the day to avoid all commits being at 00:00
    hour = random.randint(9, 23)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    
    # Format: YYYY-MM-DD HH:MM:SS
    full_date = f"{date_str} {hour:02d}:{minute:02d}:{second:02d}"
    
    msg = f"Planting grass for {date_str}"
    
    cmd = [
        "git", "commit", "--allow-empty",
        f"--date={full_date}",
        "-m", msg
    ]
    
    if dry_run:
        print(f"[DRY RUN] Would execute: {' '.join(cmd)}")
    else:
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
            print(f"Committed for {date_str} at {hour:02d}:{minute:02d}")
        except subprocess.CalledProcessError as e:
            print(f"Error committing for {date_str}: {e.stderr.decode().strip()}")

def main():
    parser = argparse.ArgumentParser(description="Backfill GitHub contributions for empty days.")
    parser.add_argument("username", help="GitHub username to fetch contributions for")
    parser.add_argument("--max-commits", type=int, default=5, help="Max commits per empty day (default: 5)")
    parser.add_argument("--dry-run", action="store_true", help="Print actions without executing")
    
    args = parser.parse_args()
    
    print(f"Fetching contributions for {args.username}...")
    html = fetch_contributions(args.username)
    
    empty_days = parse_empty_days(html)
    print(f"Found {len(empty_days)} empty days in the last year.")
    
    if not empty_days:
        print("Your graph is fully green! Good job!")
        return

    # Sort days to commit in order
    empty_days.sort()
    
    for date_str in empty_days:
        # Determine number of commits for this day (1 to max_commits)
        # We assume if it's empty, we want at least 1 commit
        num_commits = random.randint(1, args.max_commits)
        
        for _ in range(num_commits):
            git_commit(date_str, args.dry_run)
            
    if args.dry_run:
        print("\nDry run completed. No changes made.")
    else:
        print(f"\nSuccessfully generated commits for {len(empty_days)} days.")
        print("Run 'git push' to update your repository.")

if __name__ == "__main__":
    main()
