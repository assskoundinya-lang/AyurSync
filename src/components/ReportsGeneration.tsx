import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { 
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Printer,
  Share,
  Settings,
  Clock,
  CheckCircle,
  BarChart
} from 'lucide-react';

const reportTemplates = [
  {
    id: 'comprehensive',
    name: 'Comprehensive Diet Chart',
    description: 'Complete 7-day meal plan with recipes and instructions',
    pages: '8-12 pages',
    includes: ['Meal plan', 'Recipes', 'Shopping list', 'Ayurvedic guidelines']
  },
  {
    id: 'summary',
    name: 'Diet Summary Report',
    description: 'Condensed overview of recommendations and key points',
    pages: '2-3 pages',
    includes: ['Key recommendations', 'Dosha analysis', 'Quick meal ideas']
  },
  {
    id: 'weekly',
    name: 'Weekly Progress Report',
    description: 'Patient progress tracking and assessment updates',
    pages: '4-5 pages',
    includes: ['Progress metrics', 'Assessment updates', 'Recommendations']
  }
];

const samplePatients = [
  { id: 'sarah', name: 'Sarah Johnson', dosha: 'Vata-Pitta' },
  { id: 'michael', name: 'Michael Chen', dosha: 'Pitta' },
  { id: 'emma', name: 'Emma Davis', dosha: 'Kapha' }
];

const recentReports = [
  {
    id: 1,
    patient: 'Sarah Johnson',
    type: 'Comprehensive Diet Chart',
    created: '2024-01-15',
    status: 'Generated',
    pages: 10
  },
  {
    id: 2,
    patient: 'Michael Chen',
    type: 'Weekly Progress Report',
    created: '2024-01-14',
    status: 'Downloaded',
    pages: 4
  },
  {
    id: 3,
    patient: 'Emma Davis',
    type: 'Diet Summary Report',
    created: '2024-01-12',
    status: 'Shared',
    pages: 3
  }
];

export function ReportsGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState('comprehensive');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [includeRecipes, setIncludeRecipes] = useState(true);
  const [includeShoppingList, setIncludeShoppingList] = useState(true);
  const [includeGuidelines, setIncludeGuidelines] = useState(true);
  const [customNotes, setCustomNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const currentTemplate = reportTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl text-[#9E7E3D] mb-2 font-semibold">Reports & PDF Generation</h1>
          <p className="text-[#4C7A5A]/80">Create and manage patient diet charts and progress reports.</p>
        </div>
        <div className="flex gap-3 animate-slide-in-right">
          <Button className="btn-rustic-outline">
            <Settings className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button className="btn-rustic">
            <FileText className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-rustic animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-[#9E7E3D]">Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#4C7A5A]/70">Patient</label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger className="border-[#9E7E3D]/20 hover:border-[#F5C24D] transition-colors duration-200">
                      <SelectValue placeholder="Select patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {samplePatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.dosha})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#4C7A5A]/70">Report Template</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="border-[#9E7E3D]/20 hover:border-[#F5C24D] transition-colors duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#4C7A5A]/70">Report Title</label>
                <Input
                  placeholder="Enter custom title (optional)"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="border-[#9E7E3D]/20 focus:border-[#F5C24D] transition-colors duration-200"
                />
              </div>

              {currentTemplate && (
                <div className="p-4 bg-gradient-to-r from-[#E1D1A5]/50 to-[#F5C24D]/20 rounded-lg border border-[#9E7E3D]/20">
                  <h4 className="text-[#9E7E3D] mb-2 font-medium">{currentTemplate.name}</h4>
                  <p className="text-sm text-[#4C7A5A]/80 mb-2">{currentTemplate.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#4C7A5A]/70">{currentTemplate.pages}</span>
                    <div className="flex flex-wrap gap-1">
                      {currentTemplate.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-[#F5C24D]/20 text-[#9E7E3D] border-[#9E7E3D]/20">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm text-[#4C7A5A]/70">Include in Report</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recipes"
                      checked={includeRecipes}
                      onCheckedChange={setIncludeRecipes}
                      className="border-[#9E7E3D]/30 data-[state=checked]:bg-[#9E7E3D] data-[state=checked]:border-[#9E7E3D]"
                    />
                    <label htmlFor="recipes" className="text-sm text-[#9E7E3D] cursor-pointer">Recipe details with ingredients</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shopping"
                      checked={includeShoppingList}
                      onCheckedChange={setIncludeShoppingList}
                      className="border-[#9E7E3D]/30 data-[state=checked]:bg-[#9E7E3D] data-[state=checked]:border-[#9E7E3D]"
                    />
                    <label htmlFor="shopping" className="text-sm text-[#9E7E3D] cursor-pointer">Weekly shopping list</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="guidelines"
                      checked={includeGuidelines}
                      onCheckedChange={setIncludeGuidelines}
                      className="border-[#9E7E3D]/30 data-[state=checked]:bg-[#9E7E3D] data-[state=checked]:border-[#9E7E3D]"
                    />
                    <label htmlFor="guidelines" className="text-sm text-[#9E7E3D] cursor-pointer">Ayurvedic dietary guidelines</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#4C7A5A]/70">Additional Notes</label>
                <Textarea
                  placeholder="Add any custom notes or instructions for the patient..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="border-[#9E7E3D]/20 focus:border-[#F5C24D] min-h-24 transition-colors duration-200"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 btn-rustic-outline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Preview Report'}
                </Button>
                <Button className="flex-1 btn-rustic">
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          {showPreview && (
            <Card className="card-rustic animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-[#9E7E3D] flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-[#F5C24D]" />
                  Report Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 shadow-lg border-[#9E7E3D]/20" style={{ fontFamily: 'serif' }}>
                  {/* Preview Header */}
                  <div className="text-center border-b border-[#9E7E3D]/20 pb-4 mb-6">
                    <h1 className="text-2xl text-[#9E7E3D] mb-2 font-semibold">
                      {reportTitle || 'Ayurvedic Diet Chart'}
                    </h1>
                    <p className="text-[#4C7A5A]">
                      Personalized for {samplePatients.find(p => p.id === selectedPatient)?.name || 'Patient'}
                    </p>
                    <p className="text-sm text-[#4C7A5A]/60 mt-2">
                      Generated on {new Date().toLocaleDateString()} | Dr. Ayurveda Practitioner
                    </p>
                  </div>

                  {/* Sample Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg text-[#9E7E3D] mb-2 font-medium">Constitutional Analysis</h3>
                      <p className="text-sm text-[#4C7A5A]">
                        Based on your Ayurvedic assessment, your primary constitution is{' '}
                        <strong className="text-[#9E7E3D]">{samplePatients.find(p => p.id === selectedPatient)?.dosha || 'Vata-Pitta'}</strong>.
                        This report provides personalized dietary recommendations to maintain balance and optimize health.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg text-[#9E7E3D] mb-2 font-medium">Weekly Meal Plan Overview</h3>
                      <div className="grid grid-cols-7 gap-2 text-xs">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <div key={day} className="text-center p-2 bg-gradient-to-br from-[#E1D1A5]/50 to-[#F5C24D]/20 rounded border border-[#9E7E3D]/10">
                            <p className="font-medium text-[#9E7E3D]">{day}</p>
                            <p className="text-[#4C7A5A]/70">Kitchari</p>
                            <p className="text-[#4C7A5A]/70">Rice Bowl</p>
                            <p className="text-[#4C7A5A]/70">Soup</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {includeRecipes && (
                      <div>
                        <h3 className="text-lg text-[#9E7E3D] mb-2 font-medium">Featured Recipes</h3>
                        <div className="space-y-2">
                          <div className="p-3 bg-gradient-to-r from-[#E1D1A5]/50 to-[#F5C24D]/20 rounded border-l-4 border-[#F5C24D]">
                            <h4 className="text-[#9E7E3D] font-medium">Golden Turmeric Latte</h4>
                            <p className="text-xs text-[#4C7A5A]/70">Warming beverage perfect for Vata constitution</p>
                          </div>
                          <div className="p-3 bg-gradient-to-r from-[#E1D1A5]/50 to-[#F5C24D]/20 rounded border-l-4 border-[#F5C24D]">
                            <h4 className="text-[#9E7E3D] font-medium">Quinoa Kitchari</h4>
                            <p className="text-xs text-[#4C7A5A]/70">Nourishing one-pot meal for all doshas</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {customNotes && (
                      <div>
                        <h3 className="text-lg text-[#9E7E3D] mb-2 font-medium">Special Instructions</h3>
                        <div className="p-3 bg-gradient-to-r from-[#4C7A5A]/10 to-[#E1D1A5]/30 rounded border border-[#4C7A5A]/20">
                          <p className="text-sm text-[#4C7A5A]">{customNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center text-xs text-[#4C7A5A]/60 mt-6 pt-4 border-t border-[#9E7E3D]/20">
                    This is a preview. The complete report will include detailed recipes, shopping lists, and comprehensive guidelines.
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Reports & Quick Actions */}
        <div className="space-y-6">
          <Card className="card-rustic animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-[#9E7E3D] flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#F5C24D]" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={report.id} className="p-3 border border-[#9E7E3D]/20 rounded-lg bg-gradient-to-r from-[#E1D1A5]/30 to-[#F5C24D]/10 hover:shadow-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-[#9E7E3D] font-medium">{report.patient}</p>
                        <p className="text-xs text-[#4C7A5A]/70">{report.type}</p>
                      </div>
                      <Badge 
                        variant={report.status === 'Generated' ? 'default' : 'secondary'}
                        className="text-xs bg-[#F5C24D]/20 text-[#9E7E3D] border-[#9E7E3D]/20"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#4C7A5A]/60">
                      <span>{new Date(report.created).toLocaleDateString()}</span>
                      <span>{report.pages} pages</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs btn-rustic-outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs btn-rustic-outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-rustic animate-on-scroll">
            <CardHeader>
              <CardTitle className="text-[#9E7E3D]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start btn-rustic-outline">
                <Printer className="w-4 h-4 mr-2" />
                Print Last Report
              </Button>
              <Button className="w-full justify-start btn-rustic-outline">
                <Share className="w-4 h-4 mr-2" />
                Share via Email
              </Button>
              <Button className="w-full justify-start btn-rustic-outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
              <Button className="w-full justify-start btn-rustic-outline">
                <Settings className="w-4 h-4 mr-2" />
                Customize Template
              </Button>
            </CardContent>
          </Card>

          <Card className="card-rustic animate-on-scroll">
            <CardHeader>
              <CardTitle className="text-[#9E7E3D] flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-[#F5C24D]" />
                Report Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#E1D1A5]/30 to-[#F5C24D]/20 rounded-lg">
                  <span className="text-sm text-[#4C7A5A]/70">This Month</span>
                  <span className="text-lg text-[#9E7E3D] font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#4C7A5A]/20 to-[#E1D1A5]/30 rounded-lg">
                  <span className="text-sm text-[#4C7A5A]/70">Total Generated</span>
                  <span className="text-lg text-[#9E7E3D] font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#F5C24D]/20 to-[#4C7A5A]/20 rounded-lg">
                  <span className="text-sm text-[#4C7A5A]/70">Most Popular</span>
                  <span className="text-sm text-[#9E7E3D] font-medium">Comprehensive</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}