// Chatbot mejorado y unificado
(function() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'cliente') {
        return;
    }

    const CHATBOT_API = {
        getSmartResponse(message) {
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('emergencia') || lowerMessage.includes('llanta') || lowerMessage.includes('revento')) {
                return {
                    response: "🚨 **EMERGENCIA - ASISTENCIA INMEDIATA**\n\n• **Contacto urgente:** +506 8705 9379\n• **Servicio de grúa:** Disponible\n• **Ubicación:** Alto de Guadalupe, San José\n\n¿Necesitas que te contactemos?",
                    quickReplies: ['📞 Llamar ahora', '🚗 Servicio grúa', '📍 Enviar ubicación']
                };
            }

            if (lowerMessage.includes('ruido') && lowerMessage.includes('fren')) {
                return {
                    response: "🔧 **DIAGNÓSTICO DE FRENOS**\n\nLos ruidos pueden indicar:\n• Pastillas desgastadas\n• Discos dañados\n• Líquido de frenos bajo\n\n**Recomendación:** Revisión inmediata\n📅 ¿Quieres agendar una cita?",
                    quickReplies: ['📅 Agendar cita', '💰 Cotizar frenos', '📞 Consultar técnico']
                };
            }

            if (lowerMessage.includes('hola') || lowerMessage.includes('buenas')) {
                return {
                    response: "¡Hola! 👋 Soy tu asistente de **TECMAVE**\n\nEstoy aquí para ayudarte con:\n• 🚨 Emergencias en carretera\n• 🔧 Diagnóstico de problemas\n• 📅 Agendamiento de citas\n• 💰 Cotizaciones\n• 📍 Información de contacto\n\n¿En qué puedo asistirte hoy?",
                    quickReplies: ['🚨 Emergencia', '🔧 Problema mecánico', '📅 Agendar cita', '💰 Cotización', '📍 Ubicación']
                };
            }

            if (lowerMessage.includes('horario') || lowerMessage.includes('hora')) {
                return {
                    response: "🕐 **HORARIOS DE ATENCIÓN**\n\n• **Lunes a Viernes:** 7:00 AM - 6:00 PM\n• **Sábados:** 8:00 AM - 4:00 PM\n• **Domingos:** Cerrado\n\n**Emergencias:** +506 8705 9379 (24/7)",
                    quickReplies: ['📅 Agendar cita', '📞 Contactar ahora', '🚨 Emergencia']
                };
            }

            if (lowerMessage.includes('ubicacion') || lowerMessage.includes('direccion')) {
                return {
                    response: "📍 **UBICACIÓN TECMAVE**\n\n**Dirección:** Alto de Guadalupe, 25 mts este y 15 mts sur del Colegio Madre del Divino Pastor, San José, Costa Rica.\n\n**WhatsApp:** +506 8705 9379\n**Email:** tecmave.jeepgarage@gmail.com",
                    quickReplies: ['📞 Llamar ahora', '📱 Enviar WhatsApp', '🚗 Cómo llegar']
                };
            }

            if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cotizacion')) {
                return {
                    response: "💰 **COTIZACIONES PERSONALIZADAS**\n\nPara darte un precio exacto necesitamos:\n• Tipo de vehículo y modelo\n• Servicio específico requerido\n• Condición actual del vehículo\n\n📞 **Contáctanos para una cotización precisa**",
                    quickReplies: ['📞 Solicitar cotización', '📅 Agendar diagnóstico', '🔧 Consultar servicios']
                };
            }

            if (lowerMessage.includes('servicio') || lowerMessage.includes('que hacen')) {
                return {
                    response: "🔧 **SERVICIOS TECMAVE**\n\n• Mecánica general y especializada\n• Sistema de frenos y suspensión\n• Alineación y balanceo\n• Cambio de aceite y filtros\n• Diagnóstico computarizado\n• Servicio de emergencia 24/7\n• Mantenimiento preventivo",
                    quickReplies: ['🔧 Diagnóstico', '📅 Agendar servicio', '💰 Cotizar mantenimiento']
                };
            }

            if (lowerMessage.includes('cita') || lowerMessage.includes('agendar')) {
                return {
                    response: "📅 **AGENDAMIENTO DE CITAS**\n\nPara agendar tu cita necesitamos:\n• Nombre completo\n• Tipo de vehículo\n• Servicio requerido\n• Fecha preferida\n\n📞 **Contáctanos al +506 8705 9379**",
                    quickReplies: ['📞 Llamar para cita', '📱 WhatsApp para cita', '🔧 Consultar disponibilidad']
                };
            }

            // Respuesta por defecto
            return {
                response: `🔧 **TECMAVE - ASISTENCIA ESPECIALIZADA**\n\nPara ayudarte mejor con "${message}", te recomiendo:\n\n📞 **Contacto directo:** +506 8705 9379\n📍 **Visítanos:** Alto de Guadalupe, San José\n🕐 **Horario:** L-V 7AM-6PM, S 8AM-4PM\n\n¿Es una emergencia o necesitas un servicio específico?`,
                quickReplies: ['🚨 Emergencia', '🔧 Problema técnico', '📅 Agendar cita', '💰 Cotización', '📍 Ubicación']
            };
        }
    };

    // Crear elementos del chatbot
    const chatIcon = document.createElement('div');
    chatIcon.innerHTML = `
        <i class="fas fa-comment-dots"></i>
    `;
    chatIcon.className = 'chat-icon';
    chatIcon.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary), var(--primary-2));
        color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(220,38,38,0.4);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 3px solid rgba(255,255,255,0.2);
    `;

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.style.cssText = `
        position: fixed;
        bottom: 95px;
        right: 25px;
        width: 380px;
        height: 500px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 25px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(220,38,38,0.1);
    `;

    chatWindow.innerHTML = `
        <div class="chat-header" style="
            padding: 18px 20px;
            background: linear-gradient(135deg, var(--primary), var(--primary-2));
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                ">🔧</div>
                <div>
                    <h3 style="margin: 0; font-size: 1.2rem; font-weight: 700;">Asistente TECMAVE</h3>
                    <p style="margin: 0; font-size: 0.85rem; opacity: 0.9;">En línea • Listo para ayudar</p>
                </div>
            </div>
            <button class="close-chat" style="
                background: none;
                border: none;
                color: #fff;
                font-size: 1.8rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 8px;
                transition: all 0.3s ease;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            ">&times;</button>
        </div>
        <div class="chat-body" style="
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: rgba(248,250,252,0.8);
            display: flex;
            flex-direction: column;
        ">
            <div class="chat-messages" style="
                display: flex;
                flex-direction: column;
                gap: 15px;
                flex: 1;
            "></div>
            <div class="quick-replies" style="
                margin-top: 15px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            "></div>
        </div>
        <div class="chat-footer" style="
            padding: 18px 20px;
            display: flex;
            gap: 12px;
            border-top: 1px solid rgba(220,38,38,0.1);
            background: white;
        ">
            <input type="text" placeholder="Escribe tu mensaje aquí..." style="
                flex: 1;
                padding: 14px 18px;
                border: 2px solid rgba(220,38,38,0.1);
                border-radius: 12px;
                background: rgba(255,255,255,0.9);
                color: var(--text);
                font-size: 0.95rem;
                transition: all 0.3s ease;
                outline: none;
            ">
            <button style="
                padding: 14px 20px;
                background: linear-gradient(135deg, var(--primary), var(--primary-2));
                color: #fff;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(220,38,38,0.3);
                font-size: 0.95rem;
                min-width: 80px;
            ">Enviar</button>
        </div>
    `;

    document.body.appendChild(chatIcon);
    document.body.appendChild(chatWindow);

    const chatMessages = chatWindow.querySelector('.chat-messages');
    const quickReplies = chatWindow.querySelector('.quick-replies');
    const chatInput = chatWindow.querySelector('.chat-footer input');
    const sendButton = chatWindow.querySelector('.chat-footer button');
    const closeButton = chatWindow.querySelector('.close-chat');

    let conversationHistory = [];

    // Estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        .chat-icon:hover {
            transform: scale(1.1) rotate(5deg) !important;
            box-shadow: 0 15px 40px rgba(220,38,38,0.7) !important;
        }

        .chat-footer input:focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 4px rgba(220,38,38,0.15) !important;
            transform: scale(1.02) !important;
        }

        .chat-footer button:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 8px 25px rgba(220,38,38,0.5) !important;
        }

        .close-chat:hover {
            background: rgba(255,255,255,0.2) !important;
            transform: scale(1.1) rotate(90deg) !important;
        }

        .chat-message {
            padding: 14px 18px;
            border-radius: 18px;
            max-width: 85%;
            word-wrap: break-word;
            animation: messageSlideIn 0.3s ease-out;
            line-height: 1.5;
            font-size: 0.92rem;
            margin: 5px 0;
        }

        .chat-message.user {
            background: linear-gradient(135deg, var(--primary), var(--primary-2));
            color: white;
            align-self: flex-end;
            box-shadow: 0 6px 20px rgba(220,38,38,0.3);
            border-bottom-right-radius: 8px;
        }

        .chat-message.bot {
            background: rgba(255,255,255,0.95);
            color: var(--text);
            align-self: flex-start;
            border: 1px solid rgba(220,38,38,0.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            border-bottom-left-radius: 8px;
        }

        .quick-reply-btn {
            padding: 10px 16px;
            background: rgba(220,38,38,0.08);
            border: 2px solid rgba(220,38,38,0.15);
            border-radius: 12px;
            color: var(--primary);
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            font-weight: 600;
            margin: 2px;
        }

        .quick-reply-btn:hover {
            background: rgba(220,38,38,0.15);
            border-color: rgba(220,38,38,0.3);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 4px 12px rgba(220,38,38,0.2);
        }

        @keyframes messageSlideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes chatSlideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Mensaje de bienvenida
    setTimeout(() => {
        const welcomeResponse = CHATBOT_API.getSmartResponse('hola');
        addMessage('bot', welcomeResponse.response);
        createQuickReplies(welcomeResponse.quickReplies);
    }, 1000);

    // Event Listeners
    chatIcon.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatWindow.style.animation = 'chatSlideUp 0.3s ease-out';
        chatIcon.style.display = 'none';
        chatInput.focus();
    });

    closeButton.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatIcon.style.display = 'flex';
    });

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            conversationHistory.push(message);

            setTimeout(() => {
                const response = CHATBOT_API.getSmartResponse(message);
                addMessage('bot', response.response);
                createQuickReplies(response.quickReplies);
            }, 500);

            chatInput.value = '';
        }
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        messageElement.innerHTML = message.replace(/\n/g, '<br>');
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function createQuickReplies(replies) {
        quickReplies.innerHTML = '';
        if (replies && replies.length > 0) {
            replies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply-btn';
                button.textContent = reply;
                button.addEventListener('click', () => {
                    chatInput.value = reply;
                    sendMessage();
                });
                quickReplies.appendChild(button);
            });
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
})();