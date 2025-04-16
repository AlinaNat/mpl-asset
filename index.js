// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  events;
  players;
  contactSubmissions;
  faqs;
  currentUserId;
  currentEventId;
  currentPlayerId;
  currentContactId;
  currentFaqId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.players = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.faqs = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentPlayerId = 1;
    this.currentContactId = 1;
    this.currentFaqId = 1;
    this.initializeData();
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Event methods
  async getEvents() {
    return Array.from(this.events.values());
  }
  async getEvent(id) {
    return this.events.get(id);
  }
  async createEvent(insertEvent) {
    const id = this.currentEventId++;
    const event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
  // Player methods
  async getPlayers(game) {
    const players2 = Array.from(this.players.values());
    if (game) {
      return players2.filter((player) => player.game === game);
    }
    return players2;
  }
  async getPlayer(id) {
    return this.players.get(id);
  }
  async createPlayer(insertPlayer) {
    const id = this.currentPlayerId++;
    const player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }
  // Contact methods
  async createContactSubmission(insertSubmission) {
    const id = this.currentContactId++;
    const submission = {
      ...insertSubmission,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values());
  }
  // FAQ methods
  async getFaqs() {
    return Array.from(this.faqs.values()).sort((a, b) => a.order - b.order);
  }
  async getFaq(id) {
    return this.faqs.get(id);
  }
  async createFaq(insertFaq) {
    const id = this.currentFaqId++;
    const faq = { ...insertFaq, id };
    this.faqs.set(id, faq);
    return faq;
  }
  initializeData() {
    this.createEvent({
      title: "CS:GO 5v5 Tournament",
      description: "Turneu competitiv de Counter-Strike: Global Offensive cu premii \u0219i streaming live.",
      date: "12 Aug 2023",
      platform: "PC",
      teamSize: "5v5",
      prize: "5000 MDL",
      status: "\xCEn cur\xE2nd",
      imageUrl: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    });
    this.createEvent({
      title: "LoL Championship",
      description: "Campionat de League of Legends cu echipe din toat\u0103 Moldova. \xCEnscrie-te acum!",
      date: "20 Aug 2023",
      platform: "PC",
      teamSize: "5v5",
      prize: "7500 MDL",
      status: "Activ",
      imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    });
    this.createEvent({
      title: "FIFA 23 Cup",
      description: "Turneu 1v1 de FIFA 23 pentru to\u021Bi pasiona\u021Bii de fotbal virtual din Moldova.",
      date: "5 Sep 2023",
      platform: "Console",
      teamSize: "1v1",
      prize: "3000 MDL",
      status: "\xCEn cur\xE2nd",
      imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    });
    this.createPlayer({
      nickname: "AlexGG",
      realName: "Alexandru G.",
      team: "Valhalla",
      game: "CS:GO",
      score: 1458
    });
    this.createPlayer({
      nickname: "ProdigyMD",
      realName: "Victor M.",
      team: "Nexus",
      game: "CS:GO",
      score: 1395
    });
    this.createPlayer({
      nickname: "MDSniper",
      realName: "Ion C.",
      team: "Phoenix",
      game: "CS:GO",
      score: 1287
    });
    this.createPlayer({
      nickname: "MoldLegend",
      realName: "Andrei T.",
      team: "Dragons",
      game: "LoL",
      score: 2145
    });
    this.createPlayer({
      nickname: "KingMidMD",
      realName: "Dorin R.",
      team: "Titans",
      game: "LoL",
      score: 1983
    });
    this.createPlayer({
      nickname: "SupportGod",
      realName: "Maria S.",
      team: "Dragons",
      game: "LoL",
      score: 1865
    });
    this.createFaq({
      question: "Cum m\u0103 pot al\u0103tura MPL?",
      answer: "Pentru a te al\u0103tura comunit\u0103\u021Bii MPL, po\u021Bi s\u0103 ne contactezi prin formular sau s\u0103 te al\u0103turi serverului nostru de Discord. Pentru a participa la turnee, trebuie s\u0103 te \xEEnregistrezi pe platforma noastr\u0103 \u0219i s\u0103 urm\u0103re\u0219ti anun\u021Burile despre evenimentele viitoare.",
      order: 1
    });
    this.createFaq({
      question: "Ce jocuri sunt incluse \xEEn turnee?",
      answer: "\xCEn prezent, organiz\u0103m turnee pentru CS:GO, League of Legends, FIFA, Dota 2 \u0219i Valorant. Planific\u0103m s\u0103 extindem \xEEn viitor cu mai multe jocuri \xEEn func\u021Bie de interesul comunit\u0103\u021Bii. Dac\u0103 ai sugestii pentru alte jocuri, ne po\u021Bi contacta!",
      order: 2
    });
    this.createFaq({
      question: "Cum se desf\u0103\u0219oar\u0103 turneele?",
      answer: "Turneele noastre se desf\u0103\u0219oar\u0103 at\xE2t online c\xE2t \u0219i offline, \xEEn func\u021Bie de tipul evenimentului. Folosim platforme specializate pentru organizare \u0219i avem arbitri dedica\u021Bi. Fiecare turneu are reguli specifice care sunt anun\u021Bate \xEEnainte de \xEEnscriere. Premiile sunt distribuite la finalul competi\u021Biilor.",
      order: 3
    });
    this.createFaq({
      question: "Este nevoie de echipament special?",
      answer: "Pentru turneele online, ai nevoie doar de echipamentul t\u0103u personal \u0219i o conexiune stabil\u0103 la internet. Pentru evenimentele offline, noi asigur\u0103m infrastructura necesar\u0103. Juc\u0103torii pot aduce propriile periferice (tastatur\u0103, mouse, c\u0103\u0219ti) dac\u0103 doresc.",
      order: 4
    });
    this.createFaq({
      question: "Cum pot deveni sponsor?",
      answer: "Pentru parteneriate \u0219i sponsoriz\u0103ri, te rug\u0103m s\u0103 ne contactezi direct prin formularul de contact sau la adresa de email partnerships@moldovaproleague.md. Echipa noastr\u0103 \xEE\u021Bi va r\u0103spunde \xEEn cel mai scurt timp cu detalii despre pachetele de sponsorizare disponibile.",
      order: 5
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  platform: text("platform").notNull(),
  teamSize: text("team_size").notNull(),
  prize: text("prize").notNull(),
  status: text("status").notNull(),
  imageUrl: text("image_url")
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true
});
var players = pgTable("players", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  realName: text("real_name").notNull(),
  team: text("team").notNull(),
  game: text("game").notNull(),
  score: integer("score").notNull()
});
var insertPlayerSchema = createInsertSchema(players).omit({
  id: true
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});
var faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull()
});
var insertFaqSchema = createInsertSchema(faqs).omit({
  id: true
});

// server/routes.ts
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getEvents();
      res.json(events2);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app2.get("/api/players", async (req, res) => {
    try {
      const game = req.query.game;
      const players2 = await storage.getPlayers(game);
      res.json(players2);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ message: "Failed to fetch players" });
    }
  });
  app2.get("/api/players/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid player ID" });
      }
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      res.status(500).json({ message: "Failed to fetch player" });
    }
  });
  app2.get("/api/faqs", async (req, res) => {
    try {
      const faqs2 = await storage.getFaqs();
      res.json(faqs2);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      const submission = await storage.createContactSubmission(result.data);
      res.status(201).json({
        message: "Mesajul a fost trimis cu succes!",
        id: submission.id
      });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
