# AutoVerificado 🇦🇷🚗

Una app pensada para el mercado automotor argentino con el objetivo de **combatir el fraude en la venta de autos usados**, especialmente la adulteración de kilometraje, mediante el uso de registros públicos, verificación cruzada y tecnología OCR.

---

## 🎯 Propósito

En Argentina (y otros países), muchos autos usados se venden con el **odómetro adulterado**. Esto perjudica a los compradores, quienes terminan pagando más por un vehículo con más desgaste del que aparenta.

**AutoVerificado** busca:

- Generar una base de datos transparente de vehículos.
- Proveer al comprador de una herramienta para verificar la información previa del vehículo (especialmente KMs).
- Establecer un historial público y confiable para cada patente registrada.

---

## 🧩 Funcionalidades (MVP - Primera versión)

### 🧾 Registro de autos
- El dueño de un vehículo se registra y **carga los datos de su auto**: patente, kilometraje actual, fotos, cédula, etc.
- Tiene **1 semana para modificar la información**; pasado ese plazo, queda registrada de forma permanente.
- Si el usuario elimina su cuenta, **el historial del vehículo permanece**.

### 🔍 Verificación por compradores
- Cualquier usuario puede **consultar una patente** para ver si ya existe en la app.
- Puede visualizar la **última información cargada** y detectar si hay una reducción sospechosa de kilometraje entre compradores.

---

## 🛠️ Posibles características escalables (futuras versiones)

### 🔧 Mantenimiento
- Calendario de **services programados** y recordatorios push.
- Carga de cambios de aceite, pastillas de freno, cubiertas, etc.

### 🌐 Comunidad
- Links a **foros específicos por marca/modelo**.
- Secciones de preguntas frecuentes por modelo.
- Usuarios pueden compartir tips o alertas (ej. fallas comunes).

### 🤖 Chat con IA
- Chat que **identifica la versión exacta del auto** por número de chasis / patente.
- Brinda datos curiosos del modelo.
- Sugiere posibles causas ante síntomas comunes (ej. ruidos, fallos eléctricos).

### 🧑‍🔧 Peritajes
- Peritadores pueden registrarse y **ofrecer sus servicios profesionales**.
- Usuarios pueden solicitar un informe técnico antes de comprar.

---

## 🔐 Verificación de datos (en etapas)

### 🏁 MVP
- OCR para extraer texto de imágenes del DNI y cédulas (verde y azul).
- Comparación con los datos ingresados por el usuario.
- Revisión visual manual por moderadores (o por vos como admin).

### 🧪 Etapa intermedia
- Selfie obligatoria con documento en mano.
- Hash de las imágenes para detectar adulteraciones.
- Reputación por veracidad (usuarios que cargan datos coherentes ganan confianza).

### 🧠 Etapa avanzada (escalable)
- Modelos de IA entrenados con visión computacional:
  - Detectar hologramas.
  - Identificar documentos truchos.
  - Verificar coincidencia de rostro entre selfie y DNI.

---

## 💡 Ideas para futuro

- Integración con APIs públicas (DNRPA, RENAPER) si algún día están disponibles.
- Registro de historial de patentes públicas (como hacen apps tipo CheckVinculado o CarFax).
- Exportación de datos para cotizaciones de seguros o ventas.

---

## ⚙️ Tecnologías sugeridas

- **Frontend:** React Native (mobile) o React.js (web)
- **Backend:** Node.js + Express
- **OCR:** `tesseract.js`
- **DB:** PostgreSQL / MongoDB
- **Cloud:** Render / Vercel / Firebase
- **Autenticación:** JWT o Firebase Auth

---

## 🧑‍💻 ¿Querés colaborar?

Este proyecto está abierto a feedback, sugerencias y colaboración.  
Si tenés experiencia en OCR, IA, frontend o seguridad, ¡escribime o hacé un PR!

---

## 📫 Contacto

> Desarrollado por Gonzalo (Argentina) 🇦🇷  
> [LinkedIn](https://www.linkedin.com/in/gonzalo-cayssials-610bb5254/) • [GitHub](https://github.com/Gonzadeveloper)

---

