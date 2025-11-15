# Project Information


---

## **Tech Stack**

### Backend


### Frontend


---

## **Features**



---

## **Getting Started**

### 1. Clone Repository

```
git clone https://github.com/KaratSergio/Market-Lab
cd Market-Lab
```


## **Backend Setup**
```
cd backend
npm install
```
### Environment
Create .env file:


## **Frontend Setup**
```
cd frontend
npm install
```
### Environment
Create .env.local file:

Frontend runs on http://localhost:3000

### API Endpoints

```
Project
├── backend/
│   ├── .env
│   └── package.json
└── frontend/
    ├── .env.local
    └── package.json

```

### Code Quality

- **ESLint + Prettier** configured for consistent formatting
- **TypeScript** for type safety
- **Modular and reusable React components** for maintainable code

### Notes

- **React Hook Form** is used for dynamic quiz creation and validation
- **Tailwind CSS** ensures responsive UI

### Error Handling

- **404** returned if a quiz is not found
- Validation errors return **meaningful messages** to the client
