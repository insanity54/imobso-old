#!/bin/bash

ansible-playbook -i ~/.ansible-inventory --vault-password-file ~/.ansible-vault-password ./deploy.yml