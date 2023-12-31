# Project_3

In this project, we focused on childcare providers based in New York. The New York government contained a dataset about childcare facilities around New York. 2017 was the last publication of this data for NY State, so updated, dynamic information is needed.

There are two ways to run this program- using python and using HTML.

In python, we utilized the flask app (app.py) to create various routes as follows:
@app.route('/ny_map_and_chart'):  
- Leaflet was used to make a map of New York state so it was easier to look at specific counties and from there we can see the name of the childcare facility and the county it is in.
- Plotly was used to looked at how many childcare facilities there are per county. We were able to find that Bronx had the most childcare facilities with 180 followed by Brooklyn with 132.
@app.route('/ny_map_detailed')
- Leaflet was used to make a map of New York state so it was easier to look at specific counties and from there we can see the name of the childcare facility and the status of the facility.
@app.route('/amanda_js')
- Additionally, a summary table with a dropdown menu was created to display the total facility capacity of each age group for each county in New York.

Alternately, we utilized the Javascript library, Masonry, to create a dashboard of the same visuals through HTML (ny_state.html), CSS (style.css) and Javascript (logic_ny_state).

The data has also been stored in a SQL database to simplify future enhancements to this project.

## **Google Slides Presentation:**
https://docs.google.com/presentation/d/1s-7oZZPfccYcGE_V4o2IPUj2uxaU7NQUHrschXWlx7U/edit#slide=id.g2494126b58c_0_0

## **Acknowledgements:**

Childcare Facility Dataset: https://data.ny.gov/Human-Services/Child-Care-Regulated-Programs-API/fymg-3wv3
Slidesgo Template: https://slidesgo.com/theme/kindergarten-rules-of-coexistence




## NOTE:
This was a collaborative project between 4 data science students:
#### Alaa A: alaaaleryani31@gmail.com
#### Amanda K: krestamanda@gmail.com
#### Tiffany Y: hsyuk0618@gmail.com
#### Robin W: wilson.robin.leigh@gmail.com
