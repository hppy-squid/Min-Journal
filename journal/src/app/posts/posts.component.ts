import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiService, PostDto, StatisticsDto } from "../services/api.service";
import { BaseChartDirective } from "ng2-charts";
import { ChartData, ChartOptions } from 'chart.js';


@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [CommonModule, FormsModule, BaseChartDirective],
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent{
    posts: PostDto[] = [];
    statistics?: StatisticsDto;
    startDate = '';
    endDate = '';
        newContent: string = '';
        newStatus: string = 'HAPPY';
        error = '';


     statusChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#4caf50', '#f44336', '#9e9e9e'] // HAPPY, SAD, NEUTRAL
      }
    ]
  };

  statusChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };



    constructor(private apiService: ApiService) {}

    ngOnInit() {
      this.loadPosts();
    }


    loadPosts() {
      this.apiService.getPosts().subscribe({
        next: (data) => this.posts = data,
        error: (err) => this.error = err.message
      });
      console.log(this.posts);
        }



    addPost() {
      if (!this.newContent) return;

      this.apiService.newPost(this.newContent, this.newStatus).subscribe({
        next: (post) => {
          this.posts.push(post);
          this.newContent = '';
        },
        error: () => this.error = "Failed to add post: "
      });
    }
    loadStatistics() {
    if (this.startDate && this.endDate) {
    this.apiService.getStatistics(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.statistics = data;

        if (!data || !data.statusPercentages) {
          console.warn('Ingen statistik hittades för vald period');
          this.statusChartData = {
            labels: [],
            datasets: [{ data: [], backgroundColor: [] }]
          };
          return;
        }

        // Mappa labels och värden från API-svaret
        const labels = Object.keys(data.statusPercentages);
        const values = Object.values(data.statusPercentages);

        this.statusChartData = {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: labels.map(label => {
                switch (label) {
                  case 'HAPPY': return '#4caf50'; // Grön
                  case 'SAD': return '#f44336';   // Röd
                  case 'ANGRY': return '#ff9800'; // Orange
                  case 'NEUTRAL': return '#9e9e9e'; // Grå
                  default: return '#2196f3';      // Standard (blå)
                }
              })
            }
          ]
        };
      },
      error: (err) => console.error('Fel vid hämtning av statistik:', err)
    });
  }
  }
}
