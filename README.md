# Belly Button Biodiversity

![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/app%20screenshot.PNG "belly")


The dashboard can be viewed here: https://claude-hanfou.github.io/Javascript-Visualizations-and-Dashboards/


In this project, an interactive dashboard was built to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels in JSON format.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Demographics information is dynamically populated based upon a user-selected test subject ID. A bar chart, bubble chart and a gauge chart also update once the ID is changed. Code has been written using Plotly, JavaScript, HTML, CSS, and D3.js.



### Plotly

The ask was to retrieve test subject demographics, and draw a bar chart and bubble chart displaying each individual's samples. This was done as follows:

Read in samples.json using the D3 library

Retrieve metadata info for each test subject and display this in the form of an unordered list item as a key-value pair on the dashboard.

Get required data for plotting, including sample_values, otu_ids and otu_labels which were used to create a trace and plot the bar chart.

Since the task was to only plot the top 10 values, the three arrays were sliced and reversed to display the chart as below.

### Bar Chart
![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/bar.PNG "bar")

### Bubble Chart
![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/bubble.PNG "bubble")


The bonus challenge was to create a gauge chart. Using the documentation, an indicator trace was created with wfreq as the value for plotting.

Any null values were given a value of zero.

The gauge chart accounts for weekly washing frequency values ranging from 0-9.

The default bar that indicates the value was set to transparent so that a needle pointer could be used on the chart.

To plot the pointer correctly, I referred to this source which explains the math behind the pointer angles.

![alt text](https://github.com/Claude-Hanfou/Javascript-Visualizations-and-Dashboards/blob/main/Images/gauge.PNG "gauge")
