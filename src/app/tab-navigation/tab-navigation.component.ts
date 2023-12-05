import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent {
  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
