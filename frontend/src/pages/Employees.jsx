import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import { getEmployees, createEmployee, deleteEmployee } from "../api/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  
  const loadEmployees = async () => {
    setLoading(true);
    const data = await getEmployees();
    setEmployees(data);
    setLoading(false);
  };
  useEffect(() => {
    loadEmployees();
  }, []);

  const onFinish = async (values) => {
    try {
      await createEmployee(values);
      message.success("Employee created successfully");
      form.resetFields();
      loadEmployees();
    } catch (err) {
      message.error(err.detail || "Error creating employee");
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    message.success("Employee deleted");
    loadEmployees();
  };

  const columns = [
    { title: "Employee ID", dataIndex: "employee_id" },
    { title: "Full Name", dataIndex: "full_name" },
    { title: "Email", dataIndex: "email" },
    { title: "Department", dataIndex: "department" },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Add Employee">
        <Form layout="inline" form={form} onFinish={onFinish}>
          <Form.Item name="employee_id" rules={[{ required: true }]}>
            <Input placeholder="Employee ID" />
          </Form.Item>

          <Form.Item name="full_name" rules={[{ required: true }]}>
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="department" rules={[{ required: true }]}>
            <Input placeholder="Department" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Employee List">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={employees}
          loading={loading}
        />
      </Card>
    </Space>
  );
}

export default Employees;