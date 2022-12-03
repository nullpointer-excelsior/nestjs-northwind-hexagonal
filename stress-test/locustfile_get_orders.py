import time, json
from locust import HttpUser, task, between


class GetOrders(HttpUser):
    
    wait_time = between(0.5, 1.2)

    @task
    def get_order(self):
        self.client.get(f"/purchase/order", params={'page':1, 'size': 100})
 