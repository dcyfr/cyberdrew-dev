# Security Review Workflow

## Objective
Conduct a comprehensive security review of the application, identifying and mitigating potential vulnerabilities.

## Security Review Stages

### 1. Initial Security Assessment
- Review current security configurations
- Identify potential attack vectors
- Assess current security implementation

### 2. Static Code Analysis
```bash
# Run static code analysis tools
npx eslint . --ext .ts,.tsx
npm run security-scan
```

### 3. Vulnerability Scanning
- Check dependencies for known vulnerabilities
- Analyze third-party library security
- Review authentication mechanisms

### 4. Input Validation and Sanitization
- Audit all user input handling
- Implement comprehensive input validation
- Ensure proper sanitization techniques

### 5. Authentication and Authorization
- Review authentication flow
- Verify authorization checks
- Implement principle of least privilege
- Check for potential authentication bypass

### 6. Data Protection
- Audit data encryption methods
- Review data storage practices
- Ensure secure transmission of sensitive information
- Validate data access controls

### 7. Network Security
- Review API endpoint security
- Implement proper CORS configurations
- Validate HTTPS and secure communication
- Check for potential cross-site scripting (XSS) vulnerabilities

### 8. Environment and Configuration
- Review environment variable management
- Ensure no hardcoded secrets
- Validate secure configuration practices
- Check for potential misconfiguration risks

### 9. Compliance and Standards
- Verify compliance with OWASP Top 10
- Ensure GDPR and privacy regulation adherence
- Review security headers implementation

### 10. Penetration Testing Preparation
- Prepare for simulated security attacks
- Identify potential exploitation paths
- Create mitigation strategies

### 11. Continuous Monitoring
- Implement security logging
- Set up real-time vulnerability monitoring
- Create incident response plan

## Workflow Execution
```xml
<ask_followup_question>
<question>Would you like to initiate a comprehensive security review?</question>
<options>["Start Security Audit", "Focus on Specific Areas", "Cancel"]</options>
</ask_followup_question>
```

### Security Review Checklist
- [ ] Static code analysis completed
- [ ] Dependency vulnerabilities checked
- [ ] Input validation verified
- [ ] Authentication mechanisms reviewed
- [ ] Data protection measures assessed
- [ ] Network security validated
- [ ] Compliance standards met
- [ ] Monitoring systems in place
