import {
  Sprout,
  ShieldCheck,
  ScanEye,
  Activity,
  PawPrint,
  ArrowRight,
  Clock,
  Leaf,
  Image,
  History,
  Wifi,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState("");

  // Firebase Real-Time Listener
  useEffect(() => {
    console.log("Starting Firestore listener...");

    const unsubscribe = onSnapshot(
      collection(db, "detections"),
      (snapshot) => {
        console.log("Firestore listener working!");
        console.log("Total documents received:", snapshot.size);

        const records = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          // Hide test records
          .filter(
            (record) =>
              record.source !== "connection_test" &&
              record.animal !== "Firebase Test" &&
              record.animal !== "Test Animal" &&
              record.animal !== "Connection Test"
          )
          // Sort newest detections first
          .sort((a, b) => {
            const timeA = a.timestamp?.toDate?.()?.getTime() || 0;
            const timeB = b.timestamp?.toDate?.()?.getTime() || 0;
            return timeB - timeA;
          });

        console.log("Actual animal detections:", records);
        console.log("Animals received:", records.map((r) => r.animal));

        setDetections(records);
        setLoading(false);
        setFirebaseError("");
      },
      (error) => {
        console.error("Firestore listener error:", error);

        setFirebaseError(error.message);
        setLoading(false);
      }
    );

    return () => {
      console.log("Firestore listener disconnected");
      unsubscribe();
    };
  }, []);

  const latestDetection = detections[0];

  const uniqueAnimals = new Set(
    detections.map((item) => item.animal).filter(Boolean)
  ).size;

  const firebaseConnected = !loading && !firebaseError;

  return (
    <div className="website">

      {/* Navbar */}
      <nav className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={() => setActivePage("home")}
        >
          <div className="brand-icon">
            <Sprout />
          </div>
          <span>KrishiRakshak</span>
        </a>

        <div className="nav-links">
          <a
            href="#home"
            onClick={() => setActivePage("home")}
          >
            Home
          </a>

          <a
            href="#monitoring"
            onClick={() => setActivePage("home")}
          >
            Dashboard
          </a>

          <a
            href="#detection"
            onClick={() => setActivePage("detection")}
          >
            Detection
          </a>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          {loading
            ? "Connecting..."
            : firebaseConnected
            ? "Live Database"
            : "Connection Error"}
        </div>
      </nav>

      {/* Home Page */}
      {activePage === "home" && (
        <>
          <section className="hero" id="home">
            <div className="hero-content">

              <div className="eyebrow">
                <Leaf size={15} />
                SMART AGRICULTURE TECHNOLOGY
              </div>

              <h1>
                Protecting Farms.
                <br />
                <span>Powered by AI.</span>
              </h1>

              <p>
                Intelligent animal intrusion detection
                using computer vision and IoT technology.
                Monitor your farmland with smarter detection.
              </p>

              <button
                className="primary-btn"
                onClick={() => setActivePage("detection")}
              >
                Explore Detection
                <ArrowRight size={17} />
              </button>

              <div className="hero-features">
                <span>
                  <ShieldCheck size={16} />
                  Smart Protection
                </span>

                <span>
                  <ScanEye size={16} />
                  YOLO Detection
                </span>
              </div>

            </div>

            <div className="hero-visual">
              <div className="visual-circle circle-one"></div>
              <div className="visual-circle circle-two"></div>

              <div className="visual-icon">
                <Sprout size={85} strokeWidth={1.2} />
              </div>

              <div className="visual-tag">
                <Activity size={16} />
                Intelligent Monitoring
              </div>
            </div>
          </section>

          {/* Dashboard */}
          <main className="dashboard" id="monitoring">

            <div className="section-heading">
              <div>
                <span className="section-label">
                  CONTROL CENTER
                </span>

                <h2>Monitoring Overview</h2>

                <p>
                  Monitor animal activity across your farmland.
                </p>
              </div>

              <div className="connection">
                <span className="status-dot"></span>
                {loading
                  ? "Connecting to Firebase"
                  : firebaseConnected
                  ? "Live updates active"
                  : "Firebase unavailable"}
              </div>
            </div>

            {firebaseError && (
              <p style={{ color: "red" }}>
                Firebase error: {firebaseError}
              </p>
            )}

            <div className="stats-grid">
              <StatCard
                icon={<ScanEye />}
                title="Total Detections"
                value={loading ? "..." : detections.length}
                subtitle="Recorded detections"
              />

              <StatCard
                icon={<PawPrint />}
                title="Animals Detected"
                value={loading ? "..." : uniqueAnimals}
                subtitle="Unique animal classes"
              />

              <StatCard
                icon={<Wifi />}
                title="Live Updates"
                value={
                  loading
                    ? "Connecting"
                    : firebaseConnected
                    ? "Active"
                    : "Offline"
                }
                subtitle="Firestore connection"
              />
            </div>

            <section className="history-section">
              <div className="panel-heading">
                <div>
                  <h3>Detection Activity</h3>
                  <p>Latest animal detection records</p>
                </div>

                <Clock size={20} />
              </div>

              {loading ? (
                <div className="empty-history">
                  <Activity size={25} />
                  <span>Loading detection records...</span>
                </div>
              ) : detections.length === 0 ? (
                <div className="empty-history">
                  <Activity size={25} />
                  <span>No detection records available</span>
                </div>
              ) : (
                <DetectionList
                  detections={detections.slice(0, 5)}
                />
              )}
            </section>

          </main>
        </>
      )}

      {/* Animal Detection Page */}
      {activePage === "detection" && (
        <main className="detection-page">

          <div className="section-heading">
            <div>
              <span className="section-label">
                AI MONITORING
              </span>

              <h2>Animal Detection</h2>

              <p>
                YOLO-based animal identification and detection results.
              </p>
            </div>

            <div className="connection">
              <span className="status-dot"></span>
              {loading
                ? "Connecting..."
                : firebaseConnected
                ? "Live Data Connected"
                : "Connection Error"}
            </div>
          </div>

          {firebaseError && (
            <p style={{ color: "red" }}>
              Firebase error: {firebaseError}
            </p>
          )}

          {/* Latest Detection */}
          <section className="detection-section">

            <div className="panel-heading">
              <div>
                <h3>Latest Detection</h3>
                <p>
                  Most recently recorded animal detection
                </p>
              </div>

              <ScanEye size={22} />
            </div>

            {loading ? (
              <div className="detection-screen">
                <Activity size={38} />
                <h3>Loading Detection Data</h3>
              </div>
            ) : !latestDetection ? (
              <div className="detection-screen">
                <Image size={38} />
                <h3>No Animal Detected Yet</h3>
                <p>
                  Detected animals will appear here
                  when a detection is received.
                </p>
              </div>
            ) : (
              <div className="detection-screen">
                <PawPrint size={42} />

                <h3>{latestDetection.animal || "Unknown Animal"}</h3>

                <p>
                  Latest detection confidence:{" "}
                  {getConfidence(latestDetection)}%
                </p>

                <p>
                  Image: {latestDetection.image || "Not available"}
                </p>

                <p>
                  Image size:{" "}
                  {latestDetection.image_width || "—"} ×{" "}
                  {latestDetection.image_height || "—"}
                </p>

                <p>
                  Detection time:{" "}
                  {formatDate(latestDetection.timestamp)}
                </p>

                <p>
                  Note: Image preview is not stored in Firestore yet.
                </p>
              </div>
            )}

          </section>

          {/* YOLO Information */}
          <section className="detection-section">

            <div className="panel-heading">
              <div>
                <h3>Detection Information</h3>
                <p>Details received from YOLO model</p>
              </div>

              <Activity size={22} />
            </div>

            <div className="yolo-info-grid">

              <InfoCard
                title="Animal Name"
                value={latestDetection?.animal || "—"}
              />

              <InfoCard
                title="Confidence Score"
                value={
                  latestDetection
                    ? `${getConfidence(latestDetection)}%`
                    : "—"
                }
              />

              <InfoCard
                title="Detection Time"
                value={formatDate(latestDetection?.timestamp)}
              />

              <InfoCard
                title="Source"
                value={latestDetection?.source || "—"}
              />

            </div>

          </section>

          {/* Detection History */}
          <section className="history-section">

            <div className="panel-heading">
              <div>
                <h3>Detection History</h3>
                <p>Previously detected animals</p>
              </div>

              <History size={21} />
            </div>

            {loading ? (
              <div className="empty-history">
                <Clock size={25} />
                <span>Loading detection history...</span>
              </div>
            ) : detections.length === 0 ? (
              <div className="empty-history">
                <Clock size={25} />
                <span>No detection history available</span>
              </div>
            ) : (
              <DetectionList detections={detections} />
            )}

          </section>

        </main>
      )}

      {/* Footer */}
      <footer>
        <div className="brand footer-brand">
          <Sprout size={20} />
          KrishiRakshak
        </div>

        <p>
          Smart Farming · Intelligent Protection
        </p>
      </footer>

    </div>
  );
}

// Confidence formatting
function getConfidence(item) {
  if (item.confidence_percentage != null) {
    return Number(item.confidence_percentage).toFixed(2);
  }

  if (item.confidence != null) {
    return (Number(item.confidence) * 100).toFixed(2);
  }

  return "N/A";
}

// Timestamp formatting
function formatDate(timestamp) {
  if (!timestamp?.toDate) {
    return "—";
  }

  return timestamp.toDate().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Dashboard Stat Card
function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <strong>{value}</strong>
        <p>{subtitle}</p>
      </div>

    </div>
  );
}

// Information Card
function InfoCard({ title, value }) {
  return (
    <div className="yolo-info">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

// Detection History Table
function DetectionList({ detections }) {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            {["Animal", "Confidence", "Date & Time", "Source"].map(
              (heading) => (
                <th
                  key={heading}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {detections.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "12px" }}>
                {item.animal || "Unknown"}
              </td>

              <td style={{ padding: "12px" }}>
                {getConfidence(item)}%
              </td>

              <td style={{ padding: "12px" }}>
                {formatDate(item.timestamp)}
              </td>

              <td style={{ padding: "12px" }}>
                {item.source || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;