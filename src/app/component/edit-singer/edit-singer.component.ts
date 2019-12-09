import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Singer} from '../../interface/singer';
import {SingerService} from '../../service/singer.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-edit-singer',
  templateUrl: './edit-singer.component.html',
  styleUrls: ['./edit-singer.component.scss']
})
export class EditSingerComponent implements OnInit {
  messageSuccess = '';
  messageError = '';
  sub: Subscription;
  singer: Singer;
  constructor(private singerService: SingerService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.singerService.getById(id).subscribe(next => {
        this.singer = next;
      }, error => {
        console.log(error);
      });
    });
  }
  save(singer: Singer) {
    this.singerService.edit(singer.id, singer).subscribe(() => {
      this.messageSuccess = 'Edit success';
    }, error => {
      this.messageError = 'Edit error';
    });
  }
}
