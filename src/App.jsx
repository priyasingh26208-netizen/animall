
import {
  Sprout,
  ShieldCheck,
  Camera,
  ScanEye,
  Activity,
  PawPrint,
  ArrowRight,
  Clock,
  Leaf,
  Image,
  Menu,
  LayoutDashboard,
  Wifi,
  History,
} from "lucide-react";

import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

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
            
          </a>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          System Offline
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
                Awaiting connection
              </div>
            </div>

            <div className="stats-grid">
              <StatCard
                icon={<ScanEye />}
                title="Total Detections"
              />

              <StatCard
                icon={<PawPrint />}
                title="Animals Detected"
              />

              <StatCard
                icon={<Camera />}
                title="Camera Status"
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

              <div className="empty-history">
                <Activity size={25} />
                <span>No detection records available</span>
              </div>
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
              Awaiting YOLO Data
            </div>
          </div>

          {/* Image Detection */}
          <section className="detection-section">

            <div className="panel-heading">
              <div>
                <h3>Detection Image</h3>
                <p>
                  Captured image with YOLO bounding box
                </p>
              </div>

              <ScanEye size={22} />
            </div>

            <div className="detection-screen">
              <div className="scan-icon">
                <Image size={38} />
              </div>

              <h3>No Animal Detected Yet</h3>

              <p>
                YOLO captured images and detected animals
                will appear here after backend integration.
              </p>
            </div>

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
                value="—"
              />

              <InfoCard
                title="Confidence Score"
                value="—"
              />

              <InfoCard
                title="Detection Time"
                value="—"
              />

              <InfoCard
                title="Camera ID"
                value="—"
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

            <div className="empty-history">
              <Clock size={25} />
              <span>No detection history available</span>
            </div>

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

function StatCard({ icon, title }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <strong>—</strong>
        <p>Waiting for actual data</p>
      </div>

    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="yolo-info">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
