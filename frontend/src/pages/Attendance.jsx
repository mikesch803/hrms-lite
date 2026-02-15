import { useEffect, useState } from "react";
import {
  Card,
  Select,
  Form,
  DatePicker,
  Button,
  Table,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import {
  getEmployees,
  markAttendance,
  getAttendance,
} from "../api/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const loadAttendance = async (id) => {
    const data = await getAttendance(id);
    setAttendance(data);
  };

  const onFinish = async (values) => {
    try {
      await markAttendance({
        employee_id: selected,
        date: values.date.format("YYYY-MM-DD"),
        status: values.status,
      });
      message.success("Attendance marked");
      form.resetFields();
      loadAttendance(selected);
    } catch (err) {
      message.error(err.detail || "Error marking attendance");
    }
  };

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Select Employee">
        <Select
          placeholder="Select Employee"
          style={{ width: 300 }}
          onChange={(value) => {
            setSelected(value);
            loadAttendance(value);
          }}
          options={employees.map((emp) => ({
            value: emp.id,
            label: emp.full_name,
          }))}
        />
      </Card>

      {selected && (
        <Card title="Mark Attendance">
          <Form layout="inline" form={form} onFinish={onFinish}>
            <Form.Item
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker
  disabledDate={(current) => {
    return current && current > dayjs().endOf("day");
  }}
/>
            </Form.Item>

            <Form.Item
              name="status"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 150 }}
                options={[
                  { value: "Present", label: "Present" },
                  { value: "Absent", label: "Absent" },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Mark
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      {selected && (
        <Card title="Attendance Records">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={attendance}
          />
        </Card>
      )}
    </Space>
  );
}

export default Attendance;