# Belly Button Biodiversity

![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/app%20screenshot.PNG "belly")


The dashboard can be viewed here: https://claude-hanfou.github.io/Javascript-Visualizations-and-Dashboards/


In this project, an interactive dashboard was built to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels in JSON format.

Demographics information is dynamically populated based upon a user-selected test subject ID. A bar chart, bubble chart and a gauge chart also update once the ID is changed. The code for this project has been written using Plotly, JavaScript, HTML, CSS, and D3.js.


### Plotly

For this part of the project, the task was to retrieve test subject demographics, and draw a bar chart and bubble chart displaying each individual's samples. This was done as follows:

* Read in samples.json using the D3 library

* Retrieve metadata info for each test subject and display this in the form of an unordered list item as a key-value pair on the dashboard.

* Extract data for plotting, including sample_values, otu_ids and otu_labels which were used to create a trace and plot the bar chart.

* The bar chartonly plots the top 10 values, the three arrays were sliced and reversed to display the chart as below.

### Bar Chart
![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/bar.PNG "bar")

* The entire json data wasused to plot a bubble chart.
*
### Bubble Chart
![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/bubble.PNG "bubble")


Using the plotly, an indicator trace was created with wfreq(washing frequency) as the value for plotting to create a gauge chart.

The gauge chart accounts for weekly washing frequency values ranging from 0-9.


![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/gauge.PNG "gauge")
