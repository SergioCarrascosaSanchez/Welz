from pydantic import BaseModel
from typing import List

class DailyBalance(BaseModel):
    time: str
    value: float

class BudgetCategory(BaseModel):
    id: int
    name: str
    max: float
    color: str

class Budget(BaseModel):
    incomeCategories: List[BudgetCategory]
    savingCategories: List[BudgetCategory]
    expensesCategories: List[BudgetCategory]

class Account(BaseModel):
    id : int
    name : str
    balance : float

class Transaction(BaseModel): 
    id: int
    description: str
    budgetCategory: int
    account: int
    value: float
    date: str

class UserData(BaseModel):
    username: str
    dailyBalance: List[DailyBalance]
    budget: Budget
    accounts: List[Account]
    transactions: List[Transaction]


class Credentials(BaseModel):
    email: str 
    password: str

class SignupCredentials(Credentials):
    username: str