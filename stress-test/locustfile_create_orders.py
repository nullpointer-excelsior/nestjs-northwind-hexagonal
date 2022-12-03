import time, json
from locust import HttpUser, task, between

order = {
    "orderId": 20001,
    "customerId": "AROUT",
    "employeeId": 1,
    "shipperId": 3,
    "orderDate": "1998-05-05T04:00:00.000Z",
    "requiredDate": "1998-06-02T04:00:00.000Z",
    "shippedDate": "1998-06-02T04:00:00.000Z",
    "freight": 0.93,
    "shipName": "LILA-Supermercado",
    "shipAddress": "Carrera 52 con Ave. Bolívar #65-98 Llano Largo",
    "shipCity": "Barquisimeto",
    "shipRegion": "Lara",
    "shipPostalCode": "3508",
    "shipCountry": "Venezuela",
    "orderDetails": [
      {
        "orderId": 20001,
        "productId": 7,
        "unitPrice": 30,
        "quantity": 15,
        "discount": 0.05,
        "product": {
          "productId": 7,
          "productName": "Uncle Bobs Organic Dried Pears",
          "quantityPerUnit": "12 - 1 lb pkgs.",
          "unitPrice": 30,
          "unitsInStock": 15,
          "unitsOnOrder": 0,
          "discontinued": False
        }
      },
      {
        "orderId": 20001,
        "productId": 13,
        "unitPrice": 6,
        "quantity": 10,
        "discount": 0.05,
        "product": {
          "productId": 13,
          "productName": "Konbu",
          "quantityPerUnit": "2 kg box",
          "unitPrice": 6,
          "unitsInStock": 24,
          "unitsOnOrder": 0,
          "discontinued": False
        }
      }
    ]
  }

class CreateOrder(HttpUser):
    
    wait_time = between(0.5, 1.2)

    @task(3)
    def create_order(self):
        self.client.post(f"/purchase/order", data=json.dumps(order), headers={ 'Content-Type': 'application/json'})
