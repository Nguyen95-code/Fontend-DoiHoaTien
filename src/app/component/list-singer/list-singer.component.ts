import {Component, OnInit} from '@angular/core';
import {Singer} from '../../interface/singer';
import {SingerService} from '../../service/singer.service';

@Component({
  selector: 'app-list-singer',
  templateUrl: './list-singer.component.html',
  styleUrls: ['./list-singer.component.scss']
})
export class ListSingerComponent implements OnInit {
  singerList: Singer[] = [];

  constructor(private singerService: SingerService) {
  }

  ngOnInit() {
    this.singerService.getAllSinger().subscribe(result => {
      this.singerList = result;
    });
  }

}
