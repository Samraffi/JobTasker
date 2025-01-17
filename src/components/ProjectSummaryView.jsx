import Markdown from "react-markdown";

export default function ProjectSummaryView({ projectSummary }) {
  return <Markdown>{projectSummary}</Markdown>;
}

/*
<div class="container mx-auto p-4 space-y-4">
  <h3>1. Comprehensive Project Summary</h3>
  <p>
    <strong>Project Title:</strong> Website with AI functionality
  </p>
  <p>
    <strong>Client Information:</strong>
  </p>
  <ul>
    <li>Username: mtsarev</li>
    <li>Number of projects posted: 7</li>
    <li>Hire rate: 14%</li>
    <li>Preference for low-cost solutions.</li>
  </ul>
  <p>
    <strong>Project Description:</strong>
    The client is looking to convert a provided Figma design into a
    functioning website that integrates various AI-related features. The
    main functionalities required are:
  </p>
  <ol>
    <li>
      <strong>AI Model Selection</strong> – Users should be able to choose
      from different AI models.
    </li>
    <li>
      <strong>Chat with AI</strong> – Implementation of a chat interface
      that allows users to interact with the AI model selected.
    </li>
    <li>
      <strong>User Dashboard</strong> – A personal user account area where
      account-related information can be managed.
    </li>
    <li>
      <strong>Paid Subscription</strong> – A mechanism for implementing
      subscription payments for accessing features.
    </li>
    <li>
      <strong>Settings</strong> – Options for users to adjust preferences
      and settings within their accounts.
    </li>
    <li>
      <strong>Chat History</strong> – Functionality that allows users to
      view previous interactions with the AI.
    </li>
    <li>
      <strong>Chat Search</strong> – A search feature to allow users to find
      specific chat histories easily.
    </li>
  </ol>
  <p>
    <strong>Budget:</strong>
  </p>
  <ul>
    <li>Desired budget: Up to 500 ₽</li>
    <li>Acceptable budget: Up to 1,500 ₽</li>
  </ul>
  <p>
    <strong>Project Visuals:</strong>
  </p>
  <ul>
    <li>Design mockup provided via an image file (IMG_3831.jpeg).</li>
  </ul>
  <p>
    The client has expressed a tight budget constraint which suggests a need
    for developers who can deliver on a relatively lower cost but still
    achieve the desired functionalities.
  </p>
  <h3>2. Estimated Project Complexity (1-10 Scale)</h3>
  <p>
    <strong>Complexity Rating: 7/10</strong>
  </p>
  <ul>
    <li>
      <strong>Reasoning:</strong>
      <ul>
        <li>
          <strong>Frontend Development:</strong> Translating the design from
          Figma into a working website can vary in complexity depending on
          the responsiveness of the design and the technologies used.
        </li>
        <li>
          <strong>Backend Development:</strong> Establishing the necessary
          backend logic to support AI interactions, user dashboards, payment
          subscriptions, and history functionalities can be quite complex.
        </li>
        <li>
          <strong>Integration of AI:</strong> Depending on the method of
          implementing AI chat, whether using pre-built APIs or custom
          solutions, the scope and complexity can increase significantly.
        </li>
        <li>
          <strong>Subscription management</strong> and security
          considerations can also add layers of complexity, especially with
          payment processing.
        </li>
      </ul>
    </li>
  </ul>
  <p>
    Given these factors, while some aspects may be straightforward, the
    requirement for integrating multiple functionalities alongside the AI
    component raises the overall difficulty.
  </p>
  <h3>3. Recommended Skills for This Project</h3>
  <ol>
    <li>
      <p>
        <strong>Web Development:</strong>
      </p>
      <ul>
        <li>
          Proficiency in HTML, CSS, and JavaScript for frontend development.
        </li>
        <li>
          Familiarity with frameworks such as React.js or Vue.js for dynamic
          UI/UX interaction.
        </li>
      </ul>
    </li>
    <li>
      <p>
        <strong>Backend Development:</strong>
      </p>
      <ul>
        <li>
          Knowledge in server-side technologies like Node.js or Python
          (Django/Flask) to handle logic for user accounts, subscriptions,
          and AI integrations.
        </li>
      </ul>
    </li>
    <li>
      <p>
        <strong>AI Integration:</strong>
      </p>
      <ul>
        <li>
          Experience with AI APIs such as OpenAI, Google AI, or similar
          platforms for implementing chat functionality.
        </li>
      </ul>
    </li>
    <li>
      <p>
        <strong>Database Management:</strong>
      </p>
      <ul>
        <li>
          Proficiency with databases (e.g., MongoDB, PostgreSQL) for
          managing user data, chat histories, and subscription statuses.
        </li>
      </ul>
    </li>
    <li>
      <p>
        <strong>Payment Processing:</strong>
      </p>
      <ul>
        <li>
          Familiarity with payment gateways (e.g., Stripe, PayPal) for
          implementing subscription payments and handling user transactions
          securely.
        </li>
      </ul>
    </li>
    <li>
      <p>
        <strong>UI/UX Design:</strong>
      </p>
      <ul>
        <li>
          Ability to interpret Figma designs, ensuring a pixel-perfect UI
          implementation.
        </li>
      </ul>
    </li>
    <li>
      <p>
        <strong>Version Control:</strong>
      </p>
      <ul>
        <li>
          Experience with version control systems (e.g., Git) for
          collaborative development.
        </li>
      </ul>
    </li>
  </ol>
  <h3>Conclusion</h3>
  <p>
    This project presents a blend of web development challenges with a focus
    on AI interaction and user management functionalities. The client’s
    budget constraints suggest that developers willing to work at lower
    rates may need to prioritize essential features or find efficient
    development methods to meet expectations. Nonetheless, significant
    expertise in both frontend and backend development, alongside AI
    integrations, will be critical for the successful delivery of this
    project.
  </p>
</div>
*/
