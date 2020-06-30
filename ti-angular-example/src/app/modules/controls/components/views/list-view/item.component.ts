import { Component } from '@angular/core';

@Component({
    selector: 'ItemComponent',
    template: `
        <View bindId="a" height="70">
            <ImageView bindId="profileImage" top="10" left="20" width="50" borderRadius="25"></ImageView>
            <vertical-layout bindId="b" top="12" left="80" right="60">
                <Label bindId="name" left="0"></Label>
                <Label bindId="preview" left="0" right="0" maxLines="1" color="#6e6e6e"></Label>
            </vertical-layout>
            <vertical-layout bindId="c" top="12" right="10" width="50">
                <Label bindId="time" top="2" color="#6e6e6e"></Label>
                <View bindId="newMessagesBadge" top="5" width="20" height="20" backgroundColor="#8BC34A" borderRadius="10">
                    <Label bindId="newMessagesBadgeText" color="white"></Label>
                </View>
            </vertical-layout>
        </View>
    `
})
export class ItemComponent {

}