# Shipment Confirmation System (SCS) - User Management

This project is a React-based user management dashboard built as part of a technical assessment. It features a robust UI for viewing, editing, and managing user data fetched from a remote API.

## 🚀 Features & Requirements Fulfilled

[cite_start]According to the **React-SCS.docx** requirements[cite: 1]:

- [cite_start]**Data Fetching**: Consumes the ReqRes API using `axios` and `async/await`[cite: 2, 4, 17].
- [cite_start]**State Management**: Implemented with **React Query** for efficient data synchronization and loading states[cite: 4].
- [cite_start]**User List**: Displays user avatar, first name, last name, and email in a responsive table[cite: 3].
- [cite_start]**View Detail**: Click on a user's name or avatar to view their full profile in a modal[cite: 6].
- **Inline Editing**: 
  - [cite_start]Each row features an "Edit" button[cite: 7].
  - [cite_start]Clicking "Edit" enables inline input fields and toggles "Save/Cancel" buttons[cite: 8, 16].
  - [cite_start]"Save" updates the local state, and "Cancel" reverts changes[cite: 9, 15].
- **Bulk Delete**:
  - [cite_start]Checkbox selection for individual rows and a "Select All" header checkbox[cite: 11, 12].
  - [cite_start]**Confirmation Dialog**: A custom Modal triggers before removal to ensure safe deletion[cite: 13, 14].

## 🛠️ Tech Stack

- [cite_start]**Framework**: React (Create React App)[cite: 18].
- **Styling**: Chakra UI (Components) & SCSS (Custom Layout Locking).
- **Data Management**: @tanstack/react-query.
- **HTTP Client**: Axios.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://gitlab.com/catherineong0220/shipment-confirmation-system.git](https://gitlab.com/catherineong0220/shipment-confirmation-system.git)