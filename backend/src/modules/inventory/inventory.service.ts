import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  getItems() {
    // Stubbed inventory data. Replace with your database logic.
    return [
      { id: 1, name: 'Product A', quantity: 100 },
      { id: 2, name: 'Product B', quantity: 50 },
    ];
  }
}
