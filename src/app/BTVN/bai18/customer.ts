import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerGroups = [
    {
      "CustomerTypeId": 1,
      "CustomerTypeName": "VIP",
      "Customers": [
        {
          "Id": "Cus123",
          "Name": "Obama",
          "Email": "obama@gmail.com",
          "Age": 67,
          "Image": "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
        },
        {
          "Id": "Cus456",
          "Name": "Kim Jong Un",
          "Email": "unun@gmail.com",
          "Age": 38,
          "Image": "https://upload.wikimedia.org/wikipedia/commons/0/06/Kim_Jong-un_and_Vladimir_Putin_%282023-09-13%29_12_%28cropped%29.jpg?utm_source=vi.wikipedia.org&utm_campaign=index&utm_content=original"
        },
        {
          "Id": "Cus789",
          "Name": "Putin",
          "Email": "putin@gmail.com",
          "Age": 77,
          "Image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29_%28higher_res%29_2.jpg/250px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29_%28higher_res%29_2.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
        }
      ]
    },
    {
      "CustomerTypeId": 2,
      "CustomerTypeName": "Normal (Thường)",
      "Customers": [
        {
          "Id": "Cus111",
          "Name": "Donald Trump",
          "Email": "trump@gmail.com",
          "Age": 78,
          "Image": "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg"
        },
        {
          "Id": "Cus222",
          "Name": "Joe Biden",
          "Email": "biden@gmail.com",
          "Age": 81,
          "Image": "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg"
        }
      ]
    }
  ];

  constructor() { }

  getCustomerGroups() {
    return this.customerGroups;
  }
}