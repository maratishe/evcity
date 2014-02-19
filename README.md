EvCity comes from *Electric Vehicle City* and is a simulator that can model and evaluate such environments over a wide range of conditions.

### Overview

 1. EvCity is running inside browser.  This makes it possible to use various web services, like Google Maps.
 2. For data EvCity uses cloud storage.  Current version implements Dropbox API. Note that Dropbox officially has no JS API, so this code implements one. 
 3. EvCity does not generate much data.  In fact, it tries to use localStorage in your browser -- you can make it bigger if you need more space, and export/download all data when simulation is done.  In this respect, EvCity is not supposed to be a data-intenstive simulator. 
 
### GIS Dataset

It is best is EV infrastructures are based on actual physical locations.  For example, this code includes 
a dataset with about 400 Family Mart locations in Northern Kyushu, Japan.  It is likely that when EV infrastructure is 
created, it will either be based on existing infrastructure (shops, malls, etc.) or will build one closely resembling 
an existing one in terms of density distribution.  In fact, there is a research on "density of centers" which says 
that most infrastructures follow the same metric -- density of population, and therefore end up looking similar. 

Note that you can generate any dataset you want in my other project called maps2graphs at https://github.com/maratishe/maps2graphs

### History 

This project has just started and has no history to report on. But I will keep working on it. 
