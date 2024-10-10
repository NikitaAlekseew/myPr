// vite.config.ts
import { defineConfig } from "file:///mnt/c/Users/%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0/Desktop/tourLeader/tour-leader/client/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/Users/%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0/Desktop/tourLeader/tour-leader/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    outDir: "/var/www/dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    }
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvXHUwNDFEXHUwNDM4XHUwNDNBXHUwNDM4XHUwNDQyXHUwNDMwL0Rlc2t0b3AvdG91ckxlYWRlci90b3VyLWxlYWRlci9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9cdTA0MURcdTA0MzhcdTA0M0FcdTA0MzhcdTA0NDJcdTA0MzAvRGVza3RvcC90b3VyTGVhZGVyL3RvdXItbGVhZGVyL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvJUQwJTlEJUQwJUI4JUQwJUJBJUQwJUI4JUQxJTgyJUQwJUIwL0Rlc2t0b3AvdG91ckxlYWRlci90b3VyLWxlYWRlci9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiL3Zhci93d3cvZGlzdFwiLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IFwiLi9wb3N0Y3NzLmNvbmZpZy5qc1wiLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLFNBQVMsb0JBQW9CO0FBQ3haLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsUUFDL0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsRUFDWDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
