import React from "react";

const InstructionFac = () => {
  return (
    <div className="faculty__instruction">
      <b> Welcome</b> to the add faculty page of the TA Allocation Portal!
      <p>
        To add facutlies to the system, you will need to provide an excel sheet
        containing the necessary information. The information required includes
        the <b> facutly's name</b>, <b>department</b> and{" "}
        <b>courses they are offering</b>.
      </p>
      <p>
        Here are the steps to follow to add facutlies using an excel sheet:
        <ul className="AddFaculty">
          <li>
            Prepare an excel sheet containing the required information for each
            faculty. The excel sheet should have columns for the <b>name</b>,
            <b>department</b>, and <b>courses offering</b>. The first row of the
            excel sheet should contain the headers for each column.
          </li>

          <li>
            On this page, you will see a button labeled "<b>Select File</b>".
            Click on this button to select the excel sheet containing the
            student information, then click on "<b>Upload</b>" button.
          </li>

          <li>
            Once the excel sheet has been uploaded successfully, you will see a
            success message confirming that the operation was successful.
          </li>

          <li>
            If there are any errors or issues with the data, it will display an
            error message. Please make the necessary changes to the excel sheet
            and try again.
          </li>

          <li>
            You can view the newly added facutlies by navigating to the "
            <b>Allocate TA</b>" tab in the navigation bar.
          </li>

          <li>
            If there are any errors or issues with the data after the students
            have been added, you can update the excel sheet and re-upload it to
            make the necessary changes. The latest data will override the
            previous input data.
          </li>
        </ul>
      </p>
      <p>
        If you need to make changes to the faculty information, you can follow
        these steps:
        <ul className="AddFaculty">
          <li>
            Download the current faculty information Excel sheet from the "
            <b>Download</b>" button.
          </li>
          <li>
            Make the necessary changes to the Excel sheet. Save the updated
            Excel sheet on your computer.
          </li>
          <li>
            On this page, click the "<b>Choose File</b>" button and select the
            saved updated Excel sheet.
          </li>
          <li>
            Click the "<b>Upload</b>" button to update the faculty information
            in the system. The new uploaded data will <b>override</b> the
            previous data.
          </li>
        </ul>
        If you have any questions or issues with adding or updating faculty
        information, please contact the system administrator for assistance.
      </p>
    </div>
  );
};

export default InstructionFac;
