#!/bin/bash

ssh foundry@foundry.owlbeardm.com "cd /home/foundry/dungeon-bot; git pull"
ssh foundry@foundry.owlbeardm.com "cd /home/foundry/dungeon-bot; npm install"
ssh foundry@foundry.owlbeardm.com "/home/foundry/.nvm/versions/node/v18.16.0/bin/pm2 restart dungeon-bot"
ssh foundry@foundry.owlbeardm.com "/home/foundry/.nvm/versions/node/v18.16.0/bin/pm2 log dungeon-bot"