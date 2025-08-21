(function() {
    'use strict';
    
    // Configuration
    const ESPN_API_BASE = 'https://espn-one.vercel.app/api/espn?league=eng.1&id=';
    
    // Comprehensive team ID mapping across multiple leagues
    const TEAM_IDS = {
        // Premier League (eng.1)
        'AFC Bournemouth': '349',
        'Arsenal': '359',
        'Aston Villa': '362',
        'Brentford': '337',
        'Brighton & Hove Albion': '331',
        'Brighton': '331',
        'Burnley': '379',
        'Chelsea': '363',
        'Crystal Palace': '384',
        'Everton': '368',
        'Fulham': '370',
        'Leeds United': '357',
        'Liverpool': '364',
        'Manchester City': '382',
        'Manchester United': '360',
        'Newcastle United': '361',
        'Newcastle': '361',
        'Nottingham Forest': '393',
        'Sunderland': '366',
        'Tottenham Hotspur': '367',
        'Tottenham': '367',
        'West Ham United': '371',
        'West Ham': '371',
        'Wolverhampton Wanderers': '380',
        'Wolves': '380',
        
        // La Liga (esp.1)
        'Alavés': '96',
        'Athletic Club': '93',
        'Athletic Bilbao': '93',
        'Atlético Madrid': '1068',
        'Barcelona': '83',
        'Celta Vigo': '85',
        'Elche': '3751',
        'Espanyol': '88',
        'Getafe': '2922',
        'Girona': '9812',
        'Levante': '1538',
        'Mallorca': '84',
        'Osasuna': '97',
        'Rayo Vallecano': '101',
        'Real Betis': '244',
        'Real Madrid': '86',
        'Real Oviedo': '92',
        'Real Sociedad': '89',
        'Sevilla': '243',
        'Valencia': '94',
        'Villarreal': '102',
        
        // Serie A (ita.1)
        'AC Milan': '103',
        'AS Roma': '104',
        'Roma': '104',
        'Atalanta': '105',
        'Bologna': '107',
        'Cagliari': '2925',
        'Como': '2572',
        'Cremonese': '4050',
        'Fiorentina': '109',
        'Genoa': '3263',
        'Hellas Verona': '119',
        'Verona': '119',
        'Internazionale': '110',
        'Inter': '110',
        'Juventus': '111',
        'Lazio': '112',
        'Lecce': '113',
        'Napoli': '114',
        'Parma': '115',
        'Pisa': '3956',
        'Sassuolo': '3997',
        'Torino': '239',
        'Udinese': '118',
        
        // Bundesliga (ger.1)
        '1. FC Heidenheim 1846': '6418',
        'Heidenheim': '6418',
        '1. FC Union Berlin': '598',
        'Union Berlin': '598',
        'Bayer Leverkusen': '131',
        'Bayern Munich': '132',
        'Borussia Dortmund': '124',
        'Dortmund': '124',
        'Borussia Mönchengladbach': '268',
        'Mönchengladbach': '268',
        'Eintracht Frankfurt': '125',
        'Frankfurt': '125',
        'FC Augsburg': '3841',
        'Augsburg': '3841',
        'FC Cologne': '122',
        'Cologne': '122',
        'Hamburg SV': '127',
        'Hamburg': '127',
        'Mainz': '2950',
        'RB Leipzig': '11420',
        'Leipzig': '11420',
        'SC Freiburg': '126',
        'Freiburg': '126',
        'St. Pauli': '270',
        'TSG Hoffenheim': '7911',
        'Hoffenheim': '7911',
        'VfB Stuttgart': '134',
        'Stuttgart': '134',
        'VfL Wolfsburg': '138',
        'Wolfsburg': '138',
        'Werder Bremen': '137',
        
        // Ligue 1 (fra.1)
        'AJ Auxerre': '172',
        'Auxerre': '172',
        'AS Monaco': '174',
        'Monaco': '174',
        'Angers': '7868',
        'Brest': '6997',
        'Le Havre AC': '3236',
        'Le Havre': '3236',
        'Lens': '175',
        'Lille': '166',
        'Lorient': '273',
        'Lyon': '167',
        'Marseille': '176',
        'Metz': '177',
        'Nantes': '165',
        'Nice': '2502',
        'Paris FC': '6851',
        'Paris Saint-Germain': '160',
        'PSG': '160',
        'Stade Rennais': '169',
        'Rennes': '169',
        'Strasbourg': '180',
        'Toulouse': '179',
        
        // Champions League popular teams
        'Real Madrid': '86',
        'Barcelona': '83',
        'Manchester City': '382',
        'Bayern Munich': '132',
        'Liverpool': '364',
        'Chelsea': '363',
        'Arsenal': '359',
        'Manchester United': '360',
        'Juventus': '111',
        'AC Milan': '103',
        'Inter': '110',
        'Napoli': '114',
        'Atlético Madrid': '1068',
        'Borussia Dortmund': '124',
        'RB Leipzig': '11420',
        'Paris Saint-Germain': '160',
        'Benfica': '1929',
        'Porto': '437',
        'Ajax': '139',
        'PSV': '148'
    };
    
    // CSS Styles
    const CSS = `
        .match-widget {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .widget-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .widget-header h2 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .widget-loading {
            padding: 40px;
            text-align: center;
            color: #666;
        }
        
        .widget-error {
            padding: 20px;
            background: #fee;
            color: #c53030;
            text-align: center;
            margin: 20px;
            border-radius: 8px;
        }
        
        .widget-content {
            padding: 20px;
        }
        
        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .card-header {
            padding: 16px;
            font-weight: 600;
            font-size: 1.1rem;
            color: white;
        }
        
        .form-header { background: linear-gradient(135deg, #4ade80, #22c55e); }
        .h2h-header { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .stats-header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .venue-header { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        
        .card-content {
            padding: 20px;
        }
        
        .team-grid {
            display: grid;
            gap: 20px;
        }
        
        .team-section {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .team-header {
            background: #f8fafc;
            padding: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .team-logo {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
        
        .form-matches {
            display: flex;
            gap: 8px;
            padding: 12px;
            flex-wrap: wrap;
        }
        
        .form-result {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
            color: white;
        }
        
        .result-W { background: #22c55e; }
        .result-L { background: #ef4444; }
        .result-D { background: #6b7280; }
        
        .h2h-summary {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 20px;
            align-items: center;
            margin-bottom: 20px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
        }
        
        .team-record {
            text-align: center;
        }
        
        .team-record .team-name {
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .team-record .wins {
            font-size: 2rem;
            font-weight: bold;
            color: #22c55e;
        }
        
        .vs-separator {
            font-size: 1.5rem;
            font-weight: bold;
            color: #6b7280;
        }
        
        .h2h-matches {
            display: grid;
            gap: 12px;
        }
        
        .h2h-match {
            display: grid;
            grid-template-columns: 1fr auto 1fr auto;
            gap: 12px;
            align-items: center;
            padding: 12px;
            background: #f8fafc;
            border-radius: 6px;
            font-size: 0.9rem;
        }
        
        .stats-grid {
            display: grid;
            gap: 16px;
        }
        
        .stat-row {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 16px;
            align-items: center;
            padding: 12px;
            background: #f8fafc;
            border-radius: 6px;
        }
        
        .stat-label {
            text-align: center;
            font-weight: 600;
            color: #374151;
        }
        
        .stat-value {
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        .venue-info {
            display: grid;
            gap: 12px;
        }
        
        .venue-detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .venue-detail:last-child {
            border-bottom: none;
        }
        
        .venue-label {
            font-weight: 600;
            color: #374151;
        }
        
        .venue-value {
            color: #6b7280;
        }
        
        /* AdSense Integration */
        .widget-ad {
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 8px;
        }
        
        @media (max-width: 768px) {
            .match-widget {
                margin: 10px;
                border-radius: 8px;
            }
            
            .h2h-summary {
                grid-template-columns: 1fr;
                gap: 10px;
                text-align: center;
            }
            
            .vs-separator {
                order: -1;
            }
            
            .stat-row {
                grid-template-columns: 1fr;
                gap: 8px;
                text-align: center;
            }
            
            .h2h-match {
                grid-template-columns: 1fr;
                gap: 8px;
                text-align: center;
            }
        }
    `;
    
    // Inject CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = CSS;
    document.head.appendChild(styleSheet);
    
    // Find fixture ID by team names
    async function findFixtureByTeams(team1, team2) {
        const team1Id = TEAM_IDS[team1];
        const team2Id = TEAM_IDS[team2];
        
        if (!team1Id || !team2Id) {
            throw new Error(`Team not found. Supported teams: ${Object.keys(TEAM_IDS).join(', ')}`);
        }
        
        // For now, return a default fixture ID
        // In a real implementation, you'd search ESPN API for upcoming/recent matches
        // between these teams or use a fixtures endpoint
        return '740615'; // Default fixture - this should be enhanced to find actual matches
    }
    
    // Fetch fixture data
    async function fetchFixtureData(fixtureId) {
        const response = await fetch(ESPN_API_BASE + fixtureId);
        if (!response.ok) {
            throw new Error('Failed to fetch fixture data');
        }
        return response.json();
    }
    
    // Render Recent Form
    function renderRecentForm(formData, container) {
        const teamGrid = document.createElement('div');
        teamGrid.className = 'team-grid';
        
        formData.forEach(teamForm => {
            const teamSection = document.createElement('div');
            teamSection.className = 'team-section';
            
            const teamHeader = document.createElement('div');
            teamHeader.className = 'team-header';
            teamHeader.innerHTML = `
                <img src="${teamForm.team.logo}" alt="${teamForm.team.displayName}" class="team-logo">
                <span>${teamForm.team.displayName}</span>
            `;
            
            const formMatches = document.createElement('div');
            formMatches.className = 'form-matches';
            
            teamForm.events.slice(0, 5).forEach(event => {
                const resultDiv = document.createElement('div');
                resultDiv.className = `form-result result-${event.gameResult}`;
                resultDiv.textContent = event.gameResult;
                resultDiv.title = `${event.opponent.displayName} ${event.score}`;
                formMatches.appendChild(resultDiv);
            });
            
            teamSection.appendChild(teamHeader);
            teamSection.appendChild(formMatches);
            teamGrid.appendChild(teamSection);
        });
        
        container.appendChild(teamGrid);
    }
    
    // Render Head-to-Head
    function renderHeadToHead(headToHeadGames, teams, container) {
        let team1Wins = 0, team2Wins = 0, draws = 0;
        let allMatches = [];
        
        if (headToHeadGames && headToHeadGames.length > 0) {
            const team1Id = teams[0]?.team.id;
            const team2Id = teams[1]?.team.id;
            
            headToHeadGames.forEach(game => {
                if (game.events && Array.isArray(game.events)) {
                    game.events.forEach(event => {
                        allMatches.push(event);
                        const homeScore = parseInt(event.homeTeamScore);
                        const awayScore = parseInt(event.awayTeamScore);
                        
                        if (homeScore > awayScore) {
                            if (event.homeTeamId === team1Id) team1Wins++;
                            else if (event.homeTeamId === team2Id) team2Wins++;
                        } else if (awayScore > homeScore) {
                            if (event.awayTeamId === team1Id) team1Wins++;
                            else if (event.awayTeamId === team2Id) team2Wins++;
                        } else {
                            draws++;
                        }
                    });
                }
            });
        }
        
        // Summary
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'h2h-summary';
        summaryDiv.innerHTML = `
            <div class="team-record">
                <div class="team-name">${teams[0]?.team.displayName || 'Team 1'}</div>
                <div class="wins">${team1Wins}</div>
            </div>
            <div class="vs-separator">${draws} - ${team2Wins}</div>
            <div class="team-record">
                <div class="team-name">${teams[1]?.team.displayName || 'Team 2'}</div>
                <div class="wins">${team2Wins}</div>
            </div>
        `;
        
        container.appendChild(summaryDiv);
        
        // Recent matches
        if (allMatches.length > 0) {
            const matchesDiv = document.createElement('div');
            matchesDiv.className = 'h2h-matches';
            
            allMatches.slice(0, 5).forEach(match => {
                const matchDiv = document.createElement('div');
                matchDiv.className = 'h2h-match';
                matchDiv.innerHTML = `
                    <span>${match.homeTeamId === teams[0]?.team.id ? teams[0]?.team.displayName : teams[1]?.team.displayName}</span>
                    <span>${match.score}</span>
                    <span>${match.homeTeamId === teams[1]?.team.id ? teams[0]?.team.displayName : teams[1]?.team.displayName}</span>
                    <span>${new Date(match.gameDate).toLocaleDateString()}</span>
                `;
                matchesDiv.appendChild(matchDiv);
            });
            
            container.appendChild(matchesDiv);
        }
    }
    
    // Render Team Statistics
    function renderTeamStatistics(teams, container) {
        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';
        
        if (teams[0]?.statistics && teams[1]?.statistics) {
            teams[0].statistics.forEach((stat, index) => {
                const team2Stat = teams[1].statistics[index];
                if (team2Stat && stat.name === team2Stat.name) {
                    const statRow = document.createElement('div');
                    statRow.className = 'stat-row';
                    statRow.innerHTML = `
                        <div class="stat-value">${stat.displayValue}</div>
                        <div class="stat-label">${stat.label}</div>
                        <div class="stat-value">${team2Stat.displayValue}</div>
                    `;
                    statsGrid.appendChild(statRow);
                }
            });
        }
        
        container.appendChild(statsGrid);
    }
    
    // Render Venue Information
    function renderVenueInfo(venue, container) {
        if (!venue) return;
        
        const venueDiv = document.createElement('div');
        venueDiv.className = 'venue-info';
        
        if (venue.fullName) {
            const nameDetail = document.createElement('div');
            nameDetail.className = 'venue-detail';
            nameDetail.innerHTML = `
                <span class="venue-label">Stadium</span>
                <span class="venue-value">${venue.fullName}</span>
            `;
            venueDiv.appendChild(nameDetail);
        }
        
        if (venue.address?.city) {
            const cityDetail = document.createElement('div');
            cityDetail.className = 'venue-detail';
            cityDetail.innerHTML = `
                <span class="venue-label">City</span>
                <span class="venue-value">${venue.address.city}</span>
            `;
            venueDiv.appendChild(cityDetail);
        }
        
        if (venue.address?.country) {
            const countryDetail = document.createElement('div');
            countryDetail.className = 'venue-detail';
            countryDetail.innerHTML = `
                <span class="venue-label">Country</span>
                <span class="venue-value">${venue.address.country}</span>
            `;
            venueDiv.appendChild(countryDetail);
        }
        
        container.appendChild(venueDiv);
    }
    
    // Initialize widget
    async function initWidget(containerElement, team1, team2) {
        const widget = document.createElement('div');
        widget.className = 'match-widget';
        
        // Header
        const header = document.createElement('div');
        header.className = 'widget-header';
        header.innerHTML = `<h2>${team1} vs ${team2}</h2>`;
        widget.appendChild(header);
        
        // Loading state
        const loading = document.createElement('div');
        loading.className = 'widget-loading';
        loading.textContent = 'Loading match data...';
        widget.appendChild(loading);
        
        containerElement.appendChild(widget);
        
        try {
            // Find fixture ID (for now using default)
            const fixtureId = await findFixtureByTeams(team1, team2);
            
            // Fetch data
            const data = await fetchFixtureData(fixtureId);
            
            // Remove loading
            loading.remove();
            
            // Create content container
            const content = document.createElement('div');
            content.className = 'widget-content';
            
            // Recent Form
            if (data.boxscore?.form) {
                const formCard = document.createElement('div');
                formCard.className = 'card';
                formCard.innerHTML = `
                    <div class="card-header form-header">📈 Recent Form (Last 5 Matches)</div>
                    <div class="card-content"></div>
                `;
                renderRecentForm(data.boxscore.form, formCard.querySelector('.card-content'));
                content.appendChild(formCard);
            }
            
            // Head-to-Head
            if (data.boxscore?.teams) {
                const h2hCard = document.createElement('div');
                h2hCard.className = 'card';
                h2hCard.innerHTML = `
                    <div class="card-header h2h-header">⚔️ Head-to-Head Record</div>
                    <div class="card-content"></div>
                `;
                renderHeadToHead(data.headToHeadGames || [], data.boxscore.teams, h2hCard.querySelector('.card-content'));
                content.appendChild(h2hCard);
                
                // Team Statistics
                const statsCard = document.createElement('div');
                statsCard.className = 'card';
                statsCard.innerHTML = `
                    <div class="card-header stats-header">📋 Team Statistics</div>
                    <div class="card-content"></div>
                `;
                renderTeamStatistics(data.boxscore.teams, statsCard.querySelector('.card-content'));
                content.appendChild(statsCard);
            }
            
            // Venue Information
            if (data.gameInfo?.venue) {
                const venueCard = document.createElement('div');
                venueCard.className = 'card';
                venueCard.innerHTML = `
                    <div class="card-header venue-header">🏟️ Venue Information</div>
                    <div class="card-content"></div>
                `;
                renderVenueInfo(data.gameInfo.venue, venueCard.querySelector('.card-content'));
                content.appendChild(venueCard);
            }
            
            widget.appendChild(content);
            
        } catch (error) {
            loading.remove();
            const errorDiv = document.createElement('div');
            errorDiv.className = 'widget-error';
            errorDiv.textContent = `Error loading data: ${error.message}`;
            widget.appendChild(errorDiv);
        }
    }
    
    // Auto-initialize widgets when DOM is ready
    function initialize() {
        const containers = document.querySelectorAll('.match-widget-container');
        
        containers.forEach(container => {
            const team1 = container.getAttribute('data-team1');
            const team2 = container.getAttribute('data-team2');
            
            if (team1 && team2) {
                initWidget(container, team1, team2);
            } else {
                container.innerHTML = '<div class="widget-error">Error: Both data-team1 and data-team2 attributes are required</div>';
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
