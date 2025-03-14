
# QuicMart - Ecommerce website 

QuickMart is a modern e-commerce platform built with C# .NET 8 Web API and React.js (with Vite). It provides a seamless shopping experience with features like product browsing, cart management, and order checkout.

## Features

### Backend (API)
- **Product APIs**  
  - Get all products  
  - Get individual product details  

- **Cart APIs**  
  - Get all cart items  
  - Add, update, and remove cart items  

- **Checkout APIs**  
  - Store customer details  
  - Store payment details  
  - Create orders  

### Frontend
- **Product Listing Page**  
  - Displays all available products with pagination  

- **Product Detail Page**  
  - Shows full product details  
  - Option to add products to cart  

- **Cart Page**  
  - Displays all cart items  
  - Option to update or remove items  
  - Navigate to checkout  

- **Checkout Page**  
  - Collects customer details  
  - Processes payment  
  - Completes order placement  


## Tech Stack


- **Backend:** C# .NET Web API 8, Entity Framework, SQL Server, SSMS  
- **Frontend:** React.js with Vite, Tailwind CSS  
- **Tools:** Postman, Visual Studio, SQL Server Management Studio  


## Installation

### Prerequisites
- .NET SDK 8
- Node.js & npm
- SQL Server
- SSMS

### Backend Setup

1. Clone the repository: 

```bash
git clone https://github.com/19Sonali/QuickMart.git
   
cd quickmart/server
```
2. Restore dependencies:

```bash
dotnet restore
```
3. Update database:
    
```bash
dotnet ef database update
```
4. Run the API:

```bash
dotnet run
```

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd quickmart/client
```
2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm run dev
```
    
    
