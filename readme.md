# 📊 scraping-estructuras

Aplicación de **scraping** diseñada para extraer documentación oficial de webs reguladoras de instituciones.  
Utiliza **Puppeteer** para la extracción de datos y **Nodemailer** para enviar informes por correo electrónico.

---

## 🚀 Características

- Consulta Fuente:
  - [Banco Central](https://www.bce.fin.ec) → Tasas de interés oficiales
  - [SRI](https://www.sri.gob.ec) → Información tributaria y anexos
  - [Superintendencia de Bancos](https://www.superbancos.gob.ec) → Normativas financieras
- [x] Extracción de tabla de tasas de interés
- [ ] Integración con datos del SRI (Anexo ADI, declaraciones)
- [ ] Reportes de normativa bancaria y cooperativas
- Validación de datos con **Zod** (esquemas tipados y seguros).
- Generación de informes en formato de correo electrónico.
- Envío automático de reportes mediante **Nodemailer**.
- Programación de tareas con **Bun.cron** (ejecución periódica).
- [ ] Exportación de informes en PDF/Excel.
- [ ] Dashboard de visualización con BI (ej. Power BI, Metabase).
- [ ] Alertas automáticas en caso de cambios regulatorios.
- [ ] Logs y auditoría de procesos de scraping.
- [x] Configuración multi-entorno (`.env.dev`, `.env.prod`, `.env.test`).

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/scraping-estructuras.git
   cd scraping-estructuras
   ```
