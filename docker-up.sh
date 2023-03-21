# this is run in tie-lukioplus.rd.tuni.fi
# check /plussa/apache.conf
# currently bound to the address tie-lukioplus.rd.tuni.fi/regex/
docker build -t cssartist1 .
docker run -d -p 54321:3000 --name cssartist1 --restart always cssartist1
