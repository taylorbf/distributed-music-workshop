# WepPd Basic Template

This is an example of a vanilla PD patch running in the browser using WebPD. No controls, no networking, just WebPd.

Get your feet wet by running this template and then changing the PD patch to make some different sounds.




Instructions
--------------

- Open Terminal/Shell and navigate to this directory
- Start the server:`http-server -p 8000`
- Open a browser and go to localhost:8000




## How to customize

- **Sound**: You can edit the PD patch located at `/pd/main.pd` by opening it with Pure Data. This is the patch that is being loaded by the web browser.
- **Interface**: You can change the interface in `index.html`, although there is no need to for this demonstration.