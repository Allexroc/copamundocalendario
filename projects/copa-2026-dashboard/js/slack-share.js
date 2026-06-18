// Slack Share Module
class SlackShare {
    constructor() {
        this.modal = document.getElementById('slackModal');
        this.shareBtn = document.getElementById('shareSlack');
        this.closeBtn = document.getElementById('closeSlackModal');
        this.cancelBtn = document.getElementById('cancelShare');
        this.confirmBtn = document.getElementById('confirmShare');
        this.webhookInput = document.getElementById('slackWebhook');
        this.channelInput = document.getElementById('slackChannel');
        this.messageInput = document.getElementById('slackMessage');
        this.previewDiv = document.getElementById('sharePreview');
        this.previewContent = document.getElementById('previewContent');
        
        this.selectedShareType = null;
        this.init();
    }

    init() {
        // Load saved webhook from localStorage
        const savedWebhook = localStorage.getItem('slackWebhook');
        if (savedWebhook) {
            this.webhookInput.value = savedWebhook;
        }

        // Event listeners
        this.shareBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.confirmBtn.addEventListener('click', () => this.shareToSlack());
        
        // Share type selection
        document.querySelectorAll('.share-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectShareType(e.currentTarget));
        });

        // Preview on input change
        this.webhookInput.addEventListener('input', () => this.updatePreview());
        this.messageInput.addEventListener('input', () => this.updatePreview());

        // Close modal on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetModal();
    }

    resetModal() {
        document.querySelectorAll('.share-card').forEach(card => {
            card.classList.remove('selected');
        });
        this.selectedShareType = null;
        this.previewDiv.style.display = 'none';
        this.messageInput.value = '';
    }

    selectShareType(card) {
        // Remove previous selection
        document.querySelectorAll('.share-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selection to clicked card
        card.classList.add('selected');
        this.selectedShareType = card.dataset.shareType;
        
        // Update preview
        this.updatePreview();
    }

    updatePreview() {
        if (!this.selectedShareType) {
            this.previewDiv.style.display = 'none';
            return;
        }

        this.previewDiv.style.display = 'block';
        const data = this.getShareData(this.selectedShareType);
        this.previewContent.innerHTML = this.formatPreview(data);
    }

    getShareData(type) {
        const currentDate = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'America/Sao_Paulo'
        });
        
        switch(type) {
            case 'current-view':
                return this.getCurrentViewData();
            
            case 'group-standings':
                return this.getGroupStandingsData();
            
            case 'latest-results':
                return this.getLatestResultsData();
            
            case 'top-scorers':
                return this.getTopScorersData();
            
            default:
                return { title: 'Copa do Mundo 2026', text: 'Dados não disponíveis' };
        }
    }

    getCurrentViewData() {
        const activeTab = document.querySelector('.nav-item.active');
        const tabName = activeTab ? activeTab.textContent.trim() : 'Dashboard';
        
        return {
            title: `🏆 Copa do Mundo 2026 - ${tabName}`,
            text: `Confira as informações atualizadas da Copa do Mundo 2026!`,
            url: window.location.href
        };
    }

    getGroupStandingsData() {
        const groups = window.worldCupData?.groups || [];
        let text = '*📊 Classificação dos Grupos - Copa 2026*\n\n';
        
        groups.forEach(group => {
            text += `*Grupo ${group.name}*\n`;
            group.teams.forEach((team, index) => {
                const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : '•';
                text += `${emoji} ${team.name} - ${team.points}pts (${team.wins}V ${team.draws}E ${team.losses}D)\n`;
            });
            text += '\n';
        });
        
        return {
            title: '🏆 Copa do Mundo 2026 - Classificação',
            text: text,
            url: window.location.href
        };
    }

    getLatestResultsData() {
        const matches = window.worldCupData?.matches || [];
        const completedMatches = matches
            .filter(m => m.status === 'completed')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        let text = '*⚽ Últimos Resultados - Copa 2026*\n\n';
        
        completedMatches.forEach(match => {
            const date = new Date(match.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'America/Sao_Paulo'
            });
            text += `${date} - ${match.phase}\n`;
            text += `${match.homeTeam} ${match.homeScore} x ${match.awayScore} ${match.awayTeam}\n`;
            text += `📍 ${match.stadium}\n\n`;
        });
        
        return {
            title: '🏆 Copa do Mundo 2026 - Resultados',
            text: text,
            url: window.location.href
        };
    }

    getTopScorersData() {
        const scorers = window.worldCupData?.topScorers || [];
        let text = '*🎯 Artilharia - Copa 2026*\n\n';
        
        scorers.slice(0, 10).forEach((scorer, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
            text += `${medal} ${scorer.name} (${scorer.team}) - ${scorer.goals} gols\n`;
        });
        
        return {
            title: '🏆 Copa do Mundo 2026 - Artilharia',
            text: text,
            url: window.location.href
        };
    }

    formatPreview(data) {
        return `
            <div class="preview-message">
                <div class="preview-header">
                    <strong>${data.title}</strong>
                </div>
                <div class="preview-body">
                    <pre>${data.text}</pre>
                </div>
                ${this.messageInput.value ? `<div class="preview-comment">${this.messageInput.value}</div>` : ''}
            </div>
        `;
    }

    async shareToSlack() {
        const webhookUrl = this.webhookInput.value.trim();
        
        if (!webhookUrl) {
            this.showNotification('Por favor, insira a URL do Webhook do Slack', 'error');
            return;
        }

        if (!this.selectedShareType) {
            this.showNotification('Por favor, selecione o que deseja compartilhar', 'error');
            return;
        }

        // Save webhook to localStorage
        localStorage.setItem('slackWebhook', webhookUrl);

        // Prepare message
        const data = this.getShareData(this.selectedShareType);
        const channel = this.channelInput.value.trim();
        const additionalMessage = this.messageInput.value.trim();

        const slackMessage = {
            text: data.title,
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: data.title,
                        emoji: true
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: data.text
                    }
                }
            ]
        };

        // Add additional message if provided
        if (additionalMessage) {
            slackMessage.blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `💬 *Comentário:* ${additionalMessage}`
                }
            });
        }

        // Add link button
        slackMessage.blocks.push({
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: '🔗 Ver Dashboard Completo',
                        emoji: true
                    },
                    url: data.url
                }
            ]
        });

        // Add channel if specified
        if (channel) {
            slackMessage.channel = channel;
        }

        // Send to Slack
        this.confirmBtn.disabled = true;
        this.confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(slackMessage)
            });

            if (response.ok) {
                this.showNotification('✅ Compartilhado com sucesso no Slack!', 'success');
                this.closeModal();
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        } catch (error) {
            console.error('Erro ao compartilhar no Slack:', error);
            this.showNotification('❌ Erro ao compartilhar. Verifique a URL do Webhook.', 'error');
        } finally {
            this.confirmBtn.disabled = false;
            this.confirmBtn.innerHTML = '<i class="fab fa-slack"></i> Compartilhar';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.slackShare = new SlackShare();
    });
} else {
    window.slackShare = new SlackShare();
}

// Made with Bob
