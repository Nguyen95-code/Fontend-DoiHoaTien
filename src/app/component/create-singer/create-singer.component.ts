import { Component, OnInit } from '@angular/core';
import {SingerService} from '../../service/singer.service';
import {Singer} from '../../interface/singer';

@Component({
  selector: 'app-create-singer',
  templateUrl: './create-singer.component.html',
  styleUrls: ['./create-singer.component.scss']
})
export class CreateSingerComponent implements OnInit {
  messageSuccess = '';
  messageError = '';
  constructor(private singerService: SingerService) { }

  ngOnInit() {
  }
  add(singer: Singer) {
    this.singerService.create(singer).subscribe(() => {
      this.messageSuccess = 'Add success';
    }, error => {
      this.messageError = 'Add error';
    });
  }
}
