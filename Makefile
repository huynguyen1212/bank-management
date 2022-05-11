all:
	git pull
	pm2 restart 25
	cd ~/bank-branch-management/front-end && pm2 restart 26