import { Component, Input } from '@angular/core';

const fontFamilyMap = {
  brands: 'FontAwesome5BrandsRegular',
  regular: 'FontAwesome5FreeRegular',
  solid: 'FontAwesome5FreeSolid'
};

const iconMap = {
  brands: {
    'android': 'f17b',
    'apple': 'f179',
    'chrome': 'f268',
    'safari': 'f267',
    'vue': 'f41f'
  },
  regular: {

  },
  solid: {
    'angle-double-left': 'f100',
    'arrow-down': 'f063',
    'arrows-alt-v': 'f338',
    'clipboard-list': 'f46d',
    'clone': 'f24d',
    'code': 'f121',
    'cogs': 'f085',
    'comment-alt': 'f27a',
    'elipsis-h': 'f141',
    'exchange-alt': 'f362',
    'fill-drip': 'f576',
    'fire': 'f06d',
    'flask': 'f0c3',
    'grip-lines': 'f7a4',
    'heart': 'f004',
    'image': 'f03e',
    'layer': 'f5fd',
    'list': 'f03a',
    'list-alt': 'f022',
    'long-arrow-alt-down': 'f309',
    'long-arrow-alt-up': 'f30c',
    'magic': 'f0d0',
    'microphone': 'f130',
    'minus': 'f068',
    'route': 'f4d7',
    'search': 'f002',
    'sort': 'f0dc',
    'spinner': 'f110',
    'sync-alt': 'f2f1',
    'thumbs-up': 'f164',
    'user-circle': 'f2bd'
  }
};

@Component({
  selector: 'fa-icon',
  template: `<label [font]="font" text="{{unicodeValue}}"></label>`
})
export class FontAwesomeIcon {
  @Input() icon = '';

  @Input() iconStyle = 'solid';

  @Input() fontSize?: number;

  get font(): Font {
    return {
      fontFamily: fontFamilyMap[this.iconStyle],
      fontSize: this.fontSize
    }
  }

  get unicodeValue() {
    if (!iconMap[this.iconStyle] || !iconMap[this.iconStyle][this.icon]) {
      console.warn(`FontAwesome style "${this.iconStyle}" has no icon named "${this.icon}"`);
      return this.icon;
    }

    return String.fromCharCode(parseInt(iconMap[this.iconStyle][this.icon], 16));
  }
}