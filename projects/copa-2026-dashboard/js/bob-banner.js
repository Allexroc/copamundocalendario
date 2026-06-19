// Bob Update Banner Control
function initializeBobBanner() {
    const banner = document.getElementById('bobUpdateBanner');
    const closeBtn = document.getElementById('closeBobBanner');
    const viewDetailsLink = document.getElementById('viewUpdateDetails');
    
    if (!banner) return;
    
    // Check if banner was already closed in this session
    const bannerClosed = sessionStorage.getItem('bobBannerClosed');
    if (bannerClosed === 'true') {
        banner.style.display = 'none';
        return;
    }
    
    // Close button handler
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => {
                banner.style.display = 'none';
                sessionStorage.setItem('bobBannerClosed', 'true');
            }, 500);
        });
    }
    
    // View details link handler
    if (viewDetailsLink) {
        viewDetailsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showUpdateDetailsModal();
        });
    }
}

function showUpdateDetailsModal() {
    const modalHTML = `
        <div class="modal-overlay" id="updateDetailsModal" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; align-items: center; justify-content: center;">
            <div class="modal-content" style="background: white; border-radius: 12px; max-width: 800px; width: 90%; max-height: 90vh; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <div class="modal-header" style="background: linear-gradient(135deg, #0F62FE 0%, #0043CE 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 24px;"><i class="fas fa-robot"></i> Detalhes da Atualização do Bob</h2>
                    <button class="modal-close" onclick="closeUpdateDetailsModal()" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 20px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px; max-height: calc(90vh - 80px); overflow-y: auto;">
                    <div style="background: linear-gradient(135deg, #0F62FE 0%, #0043CE 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 0;">✅ Atualização Concluída com Sucesso!</h3>
                        <p style="margin: 0; opacity: 0.9;">19 de junho de 2026, 12:27 BRT</p>
                    </div>
                    
                    <h3 style="color: #0F62FE; margin-top: 20px;"><i class="fas fa-check-circle" style="color: #42BE65;"></i> Resumo das Correções</h3>
                    <ul style="line-height: 1.8; color: #333;">
                        <li><strong>28 partidas corrigidas</strong> com dados reais da API Football-Data.org</li>
                        <li><strong>Rodada 1 completa:</strong> 24 jogos (11-17 de junho)</li>
                        <li><strong>Rodada 2 parcial:</strong> 4 jogos finalizados (18 de junho)</li>
                        <li><strong>Classificações recalculadas</strong> automaticamente para todos os grupos</li>
                    </ul>
                    
                    <h3 style="color: #0F62FE; margin-top: 20px;"><i class="fas fa-trophy" style="color: #FFD700;"></i> Destaques</h3>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px; color: #333;">
                        <p style="margin: 5px 0;"><strong>Grupo A:</strong> México lidera com 6 pontos (2 vitórias)</p>
                        <p style="margin: 5px 0;"><strong>Grupo B:</strong> Canadá e Suíça empatados com 4 pontos</p>
                        <p style="margin: 10px 0 5px 0;"><strong>Maiores goleadas:</strong></p>
                        <ul style="margin: 5px 0;">
                            <li>🇩🇪 GER 7-1 CUW 🇨🇼</li>
                            <li>🇨🇦 CAN 6-0 QAT 🇶🇦</li>
                            <li>🇸🇪 SWE 5-1 TUN 🇹🇳</li>
                        </ul>
                    </div>
                    
                    <h3 style="color: #0F62FE; margin-top: 20px;"><i class="fas fa-chart-line" style="color: #0F62FE;"></i> Estatísticas</h3>
                    <ul style="line-height: 1.8; color: #333;">
                        <li><strong>115 gols</strong> marcados em 28 partidas</li>
                        <li><strong>Média:</strong> 4.11 gols por jogo</li>
                        <li><strong>Fonte:</strong> API Football-Data.org</li>
                    </ul>
                    
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px; color: #0F62FE;">
                        <p style="margin: 0;"><i class="fas fa-info-circle"></i> <strong>Nota:</strong> Os dados são atualizados automaticamente conforme novos jogos são finalizados.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close on overlay click
    const modal = document.getElementById('updateDetailsModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeUpdateDetailsModal();
        }
    });
}

function closeUpdateDetailsModal() {
    const modal = document.getElementById('updateDetailsModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    }
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeBobBanner);

console.log('✅ Bob Banner module loaded');

// Made with Bob
