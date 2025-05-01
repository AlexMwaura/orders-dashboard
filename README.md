# OrdersDashboard

OrdersDashboard is a single-page Angular application for managing e-commerce orders. It allows users to **view, create, edit, and delete orders** via a clean and responsive dashboard interface.

---

## 🚀 Features

- View a list of all orders with filtering and sorting options
- Create new orders using a form with validation
- Edit existing orders
- Delete orders with confirmation
- Mocked backend using `json-server`
- Fully unit-tested with **Karma + Jasmine**
- UI styled using **Sass** and modern design principles

---

## 🛠️ Tech Stack

- **Angular** 18+
- **Angular CLI** 18.2.3
- **TypeScript**
- **Sass** for styling
- **json-server** for mocked REST API
- **Karma + Jasmine** for unit testing

---

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/orders-dashboard.git
   cd orders-dashboard
2. **Install Dependencies**
    ```bash
    npm install
3. **Start the mock backend**
    ```bash
    npm run json-server

---
## 🧪 Running Tests
  ```bash
 ng test
 
* Tests are written using Karma and Jasmine, and include coverage for *

- AppComponent

- OrderListComponent

- CreateOrderComponent

- OrderService

---


🧩 Design Decisions
Modular architecture: Feature-based modules and standalone components are used to keep the codebase scalable.

- Reactive Forms: Used for managing form inputs in the Create/Edit Order views with built-in validation.

- Mock backend (json-server): Ideal for frontend development and testing without requiring a real backend.

- Typed models: Strong typing with the Order interface improves maintainability.

- Styling with Sass: Sass variables and nesting help maintain consistent design.

