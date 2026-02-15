from sqlalchemy.orm import Session
from models import Employee, Attendance
from sqlalchemy.exc import IntegrityError


# Employee CRUD
def create_employee(db: Session, employee):
    new_employee = Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department,
    )

    db.add(new_employee)
    try:
        db.commit()
        db.refresh(new_employee)
        return new_employee
    except IntegrityError:
        db.rollback()
        return None


def get_all_employees(db: Session):
    return db.query(Employee).all()


def delete_employee(db: Session, employee_id: int):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        return None

    db.delete(employee)
    db.commit()
    return employee


# Attendance CRUD
def mark_attendance(db: Session, attendance):
    new_attendance = Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status.value,
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance


def get_attendance_by_employee(db: Session, employee_id: int):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()