import React, { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Formik } from "formik";

export default function App() {
  // =========================
  // FORM SUBMITTED RESULTS
  // =========================
  const [loginResult, setLoginResult] = useState(null);
  const [studentResult, setStudentResult] = useState(null);
  const [feedbackResult, setFeedbackResult] = useState(null);

  // =========================
  // MODAL STATES
  // =========================
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  // =========================
  // CONFIRMATION MODAL RESULT
  // =========================
  const [deleteMessage, setDeleteMessage] = useState("");

  // =========================
  // TASK LIST FOR MODAL FORM
  // =========================
  const [tasks, setTasks] = useState([]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.mainTitle}>Formik and Modal Practice App</Text>

      {/* =====================================================
          FORMIK EXAMPLE 1: BASIC LOGIN FORM
      ====================================================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Formik Example 1: Login Form</Text>

        <Text style={styles.description}>
          This basic form collects email and password.
        </Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, actions) => {
            setLoginResult(values);
            actions.resetForm();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange("email")}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
              />

              <Button title="Login" onPress={handleSubmit} />
            </View>
          )}
        </Formik>

        {loginResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Login Submitted</Text>
            <Text>Email: {loginResult.email}</Text>
            <Text>Password: {loginResult.password}</Text>
          </View>
        )}
      </View>

      {/* =====================================================
          FORMIK EXAMPLE 2: STUDENT REGISTRATION WITH VALIDATION
      ====================================================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Formik Example 2: Student Registration
        </Text>

        <Text style={styles.description}>
          This form uses validation and displays error messages.
        </Text>

        <Formik
          initialValues={{
            name: "",
            email: "",
            semester: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = "Name is required";
            }

            if (!values.email) {
              errors.email = "Email is required";
            } else if (!values.email.includes("@")) {
              errors.email = "Enter a valid email";
            }

            if (!values.semester) {
              errors.semester = "Semester is required";
            } else if (isNaN(values.semester)) {
              errors.semester = "Semester must be a number";
            }

            return errors;
          }}
          onSubmit={(values, actions) => {
            setStudentResult(values);
            actions.resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={styles.label}>Student Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter student name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />

              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Student Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter student email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />

              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Semester</Text>
              <TextInput
                style={styles.input}
                placeholder="Example: 5"
                keyboardType="numeric"
                value={values.semester}
                onChangeText={handleChange("semester")}
                onBlur={handleBlur("semester")}
              />

              {touched.semester && errors.semester && (
                <Text style={styles.error}>{errors.semester}</Text>
              )}

              <Button title="Register Student" onPress={handleSubmit} />
            </View>
          )}
        </Formik>

        {studentResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Registered Student</Text>
            <Text>Name: {studentResult.name}</Text>
            <Text>Email: {studentResult.email}</Text>
            <Text>Semester: {studentResult.semester}</Text>
          </View>
        )}
      </View>

      {/* =====================================================
          FORMIK EXAMPLE 3: COURSE FEEDBACK FORM
      ====================================================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Formik Example 3: Course Feedback
        </Text>

        <Text style={styles.description}>
          This form collects course name, rating, and comments.
        </Text>

        <Formik
          initialValues={{
            courseName: "",
            rating: "",
            comments: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.courseName) {
              errors.courseName = "Course name is required";
            }

            if (!values.rating) {
              errors.rating = "Rating is required";
            } else if (isNaN(values.rating)) {
              errors.rating = "Rating must be a number";
            } else if (Number(values.rating) < 1 || Number(values.rating) > 5) {
              errors.rating = "Rating must be between 1 and 5";
            }

            if (!values.comments) {
              errors.comments = "Comments are required";
            }

            return errors;
          }}
          onSubmit={(values, actions) => {
            setFeedbackResult(values);
            actions.resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={styles.label}>Course Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Example: Mobile App Development"
                value={values.courseName}
                onChangeText={handleChange("courseName")}
                onBlur={handleBlur("courseName")}
              />

              {touched.courseName && errors.courseName && (
                <Text style={styles.error}>{errors.courseName}</Text>
              )}

              <Text style={styles.label}>Rating</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter rating from 1 to 5"
                keyboardType="numeric"
                value={values.rating}
                onChangeText={handleChange("rating")}
                onBlur={handleBlur("rating")}
              />

              {touched.rating && errors.rating && (
                <Text style={styles.error}>{errors.rating}</Text>
              )}

              <Text style={styles.label}>Comments</Text>
              <TextInput
                style={[styles.input, styles.largeInput]}
                placeholder="Write your comments"
                multiline={true}
                value={values.comments}
                onChangeText={handleChange("comments")}
                onBlur={handleBlur("comments")}
              />

              {touched.comments && errors.comments && (
                <Text style={styles.error}>{errors.comments}</Text>
              )}

              <Button title="Submit Feedback" onPress={handleSubmit} />
            </View>
          )}
        </Formik>

        {feedbackResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Submitted Feedback</Text>
            <Text>Course: {feedbackResult.courseName}</Text>
            <Text>Rating: {feedbackResult.rating}/5</Text>
            <Text>Comments: {feedbackResult.comments}</Text>
          </View>
        )}
      </View>

      {/* =====================================================
          MODAL EXAMPLE 1: SIMPLE INFORMATION MODAL
      ====================================================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Modal Example 1: Information</Text>

        <Text style={styles.description}>
          This modal only displays information.
        </Text>

        <Button
          title="Open Information Modal"
          onPress={() => setInfoModalVisible(true)}
        />

        <Modal
          visible={infoModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setInfoModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Information</Text>

              <Text style={styles.modalText}>
                Modal is a popup window displayed above the current screen.
              </Text>

              <Button
                title="Close"
                onPress={() => setInfoModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>

      {/* =====================================================
          MODAL EXAMPLE 2: CONFIRMATION MODAL
      ====================================================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Modal Example 2: Delete Confirmation
        </Text>

        <Text style={styles.description}>
          This modal asks the user to confirm an action.
        </Text>

        <View style={styles.fileBox}>
          <Text style={styles.fileName}>Operating Systems Notes</Text>
          <Button
            title="Delete Item"
            color="#c62828"
            onPress={() => {
              setDeleteMessage("");
              setConfirmModalVisible(true);
            }}
          />
        </View>

        {deleteMessage !== "" && (
          <View style={styles.resultBox}>
            <Text>{deleteMessage}</Text>
          </View>
        )}

        <Modal
          visible={confirmModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Delete Item?</Text>

              <Text style={styles.modalText}>
                Are you sure you want to delete Operating Systems Notes?
              </Text>

              <View style={styles.buttonRow}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => {
                    setConfirmModalVisible(false);
                    setDeleteMessage("Deletion cancelled.");
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    setConfirmModalVisible(false);
                    setDeleteMessage("Operating Systems Notes deleted.");
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* =====================================================
          MODAL EXAMPLE 3: FORMIK FORM INSIDE A MODAL
      ====================================================== */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Modal Example 3: Form Inside Modal
        </Text>

        <Text style={styles.description}>
          This modal contains a Formik form for adding tasks.
        </Text>

        <Button
          title="Add New Task"
          onPress={() => setTaskModalVisible(true)}
        />

        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks added yet.</Text>
        ) : (
          <View style={styles.taskList}>
            {tasks.map((task, index) => (
              <View key={index} style={styles.taskItem}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text>Priority: {task.priority}</Text>
              </View>
            ))}
          </View>
        )}

        <Modal
          visible={taskModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setTaskModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Add New Task</Text>

              <Formik
                initialValues={{
                  title: "",
                  priority: "",
                }}
                validate={(values) => {
                  const errors = {};

                  if (!values.title) {
                    errors.title = "Task title is required";
                  }

                  if (!values.priority) {
                    errors.priority = "Priority is required";
                  } else if (
                    values.priority.toLowerCase() !== "high" &&
                    values.priority.toLowerCase() !== "medium" &&
                    values.priority.toLowerCase() !== "low"
                  ) {
                    errors.priority = "Use High, Medium, or Low";
                  }

                  return errors;
                }}
                onSubmit={(values, actions) => {
                  setTasks((previousTasks) => [
                    ...previousTasks,
                    {
                      title: values.title,
                      priority: values.priority,
                    },
                  ]);

                  actions.resetForm();
                  setTaskModalVisible(false);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <Text style={styles.label}>Task Title</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Example: Prepare for MAD viva"
                      value={values.title}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                    />

                    {touched.title && errors.title && (
                      <Text style={styles.error}>{errors.title}</Text>
                    )}

                    <Text style={styles.label}>Priority</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="High, Medium, or Low"
                      value={values.priority}
                      onChangeText={handleChange("priority")}
                      onBlur={handleBlur("priority")}
                    />

                    {touched.priority && errors.priority && (
                      <Text style={styles.error}>{errors.priority}</Text>
                    )}

                    <View style={styles.buttonRow}>
                      <Pressable
                        style={styles.cancelButton}
                        onPress={() => {
                          resetForm();
                          setTaskModalVisible(false);
                        }}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </Pressable>

                      <Pressable
                        style={styles.saveButton}
                        onPress={handleSubmit}
                      >
                        <Text style={styles.buttonText}>Save Task</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    padding: 18,
    paddingTop: 45,
  },

  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 22,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 6,
  },

  description: {
    color: "#555",
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 11,
    marginBottom: 4,
    backgroundColor: "#ffffff",
  },

  largeInput: {
    height: 85,
    textAlignVertical: "top",
  },

  error: {
    color: "#c62828",
    marginTop: 2,
    marginBottom: 5,
  },

  resultBox: {
    backgroundColor: "#e6f4ea",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  resultTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 22,
  },

  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 12,
  },

  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  cancelButton: {
    width: "47%",
    backgroundColor: "#777777",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    width: "47%",
    backgroundColor: "#c62828",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButton: {
    width: "47%",
    backgroundColor: "#1565c0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  fileBox: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },

  fileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  emptyText: {
    marginTop: 15,
    textAlign: "center",
    color: "#777777",
  },

  taskList: {
    marginTop: 15,
  },

  taskItem: {
    backgroundColor: "#eaf2ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3,
  },
});